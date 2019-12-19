$( document ).ready(function() {
    $("#submitButton").click(
		function(e){	
            e.preventDefault();
		
			sendAjaxForm('result_form', 'ajax-form', 'ajax/action_ajax_form.php');
			return false; 
		}
	);
});
 
 function errTag(err){
    return "<p class='err'>"+err+"</p>";
}

function printErrors(result){   
   if (result.pasError   != undefined) $('#pas-err').html(errTag(result.pasError));
   if (result.repasError != undefined) $('#repas-err').html(errTag(result.repasError));
   if (result.emailError != undefined) $('#email-err').html(errTag(result.emailError));
}

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        type:     "POST",
        url:     url,     
        data: jQuery("#"+ ajax_form).serialize(),  
        success: function(response) { 
        	result = jQuery.parseJSON(response);

            $('p.user-form__err').html(''); //стираем сообщения об ошибках

            if (result.isError){
                printErrors(result);
            }else{
                $('#submit-comment').html("последние изменения "+ result.dt);
            }  

            if (result.alert){
                alert(result.alert);
            }

    	},
    	error: function(response) { 
    		document.getElementById(result_form).innerHTML = "Ошибка. Данные не отправленны.";
    	}
 	});
} 
