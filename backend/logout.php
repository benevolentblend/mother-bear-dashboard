<?php
session_start();

$responce = new stdClass();
$responce->success = true;

$_SESSION['authenicated'] = false;
$_SESSION['user'] = null;

echo json_encode($responce);

?>
