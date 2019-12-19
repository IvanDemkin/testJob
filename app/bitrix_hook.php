<?php

function bitrixHook($status, $email, $city){
    
    //webhook to bitrix24
    $queryUrl = 'https://b24-8de7sz.bitrix24.ru/rest/1/scyabcw4c0k1woej/user.update/';

    $queryData  = http_build_query(
        array(
            'TITLE' => $status, 
            'EMAIL' => $email, 
            'CITY' => $city,
        )
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_POST => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $queryUrl,
            CURLOPT_POSTFIELDS => $queryData,
         )
    );

    $res = curl_exec($curl);
    curl_close($curl);
	
	return $res;
}
