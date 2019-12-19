function sortByCityName(cities) {
	cities.sort((a, b) => a.city > b.city ? 1 : -1);
}

function setStatus(e){
	if (e.keyCode == 13) {
		newStatus = $('#status').val();
		$('.status p').html(newStatus).show();		
		$('#status').hide();
	}	
}

function setBigestCityFirst(cities){
	let max = Number(cities[0].population);
	let bigestCityKey = 0;
	$.each(cities, function(key, val){
		if (Number(val.population) > max) {
			max = val.population;
			bigestCityKey = key;
		}
	});
	if (bigestCityKey != 0){
		let temp = cities[bigestCityKey];
		while (bigestCityKey > 0){
			cities[bigestCityKey] = cities[bigestCityKey - 1];
			bigestCityKey--;
		}
		cities[0] = temp;
	}
}

function fillCityList(cities){
	let html = '';
	$.each(cities, function(key, val){
		html += '<option value="'+val.city+'">'+val.city+'</option>';
	});
	$('#city').append(html);
}


$(document).ready(function(){
	$('#status').hide();

	let bigCities = [];

	$.getJSON('ajax/cities.json', function(data){
	 var items = [];
	 
	$.each(data, function(key, val){
	    if (val.population > 50000){
	    	bigCities.push(val);
	    }
	}); 

	sortByCityName(bigCities);

	setBigestCityFirst(bigCities);

	fillCityList(bigCities);

	});

});



$('.status-link').click(function(){
	oldStatus = $('.status p').html();
	$('#status').val(oldStatus);
	$('#status').show().focus();
	$('.status p').hide();
});


