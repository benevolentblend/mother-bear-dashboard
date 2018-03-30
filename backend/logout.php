<?php
session_start();

$responce = new stdClass();
$responce->success = true;
$responce->events = array();

if(!isset($_SESSION['authenicated']) || !$_SESSION['authenicated']) {
  http_response_code(401);
  $responce->success = false;
  echo json_encode($responce);
  die();
}

$_SESSION['authenicated'] = false;
$_SESSION['user'] = null;

echo json_encode($responce);

?>
