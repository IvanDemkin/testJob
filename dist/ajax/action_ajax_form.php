<?php
   
require_once('../bitrix_hook.php');

$status = $_POST["status"];
$city = $_POST['city'];

$result = [];

$isError = false;

if (isset($_POST["pas"]) && $_POST["pas"]!='' ){
    $pas = $_POST["pas"]; 
    if (strlen($pas) < 5){
        $result['pasError']='Используйте не менее 5 символов';
        $isError = true;
    }
}else{
    $result['pasError']='Укажите пароль';
    $isError = true;
}

if (isset($_POST["repas"]) && $_POST["repas"]!='' ){
    $repas = $_POST["repas"]; 
    if ($pas != $repas){
        $result['repasError']='Пароли не совпадают';
        $isError = true;
    }
}else{
    $result['repasError']='Укажите пароль';
    $isError = true;
}

if (isset($_POST["email"]) && $_POST["email"]!='' ){
    $email = $_POST["email"];           
    if ( ! filter_var($email, FILTER_VALIDATE_EMAIL) ){
        $result['emailError']='Не верный E-mail';
        $isError = true;
    }
}else{
    $result['emailError']='Укажите E-mail';
    $isError = true;
}

if (!$isError){
    date_default_timezone_set('Asia/Krasnoyarsk');    
    $dt = date('j.n.Y в G:i:s', time());
    
    $result = array(
        'isError' => false,
        'dt' => $dt
     );

    if (bitrixHook($status, $email, $city)){
        $result['alert'] = 'Статус: '.$status.', E-mail: '.$email.', Город: '.$city;
    }
}else{
    $result['isError'] = true;
}

    echo json_encode($result); 
?>