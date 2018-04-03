<?php
session_start();

$responce = new stdClass();
$responce->success = true;
<<<<<<< HEAD
<<<<<<< HEAD
$responce->events = array();

if(!isset($_SESSION['authenicated']) || !$_SESSION['authenicated']) {
  http_response_code(401);
  $responce->success = false;
  echo json_encode($responce);
  die();
}
=======
>>>>>>> a224eb995a55b9f73bcae6b52c1c90336f18f50c
=======
>>>>>>> a224eb995a55b9f73bcae6b52c1c90336f18f50c

$_SESSION['authenicated'] = false;
$_SESSION['user'] = null;

echo json_encode($responce);

?>
