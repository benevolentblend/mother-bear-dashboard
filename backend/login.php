<?php
session_start();

require('mysql_connect.php');
http_response_code(401);
$responce = array();
$responce['success'] = true;
$responce['message'] = "";

if(!isset($_POST['email']) || !isset($_POST['password'])) {
  $responce['success'] = false;
  $responce['message'] = 'missing email or password';

  echo json_encode($responce);
  die();
}

$email = $_POST['email'];
$password = $_POST['password'];

openConnection();

/* Select user where email and password match */
$query = "SELECT `email`,`color1`,`color2`,`color3` FROM `users` WHERE `email` = '".
mysqli_escape_string($connection, $email)."' AND `password` ='".
mysqli_escape_string($connection, $password)."';";

$result = runQuery($query);
if(mysqli_num_rows($result) < 1) {
  closeConnection();
  $responce['success'] = false;
  $responce['message'] = "Invalid email and password combination.";
  echo json_encode($responce);
  die();
}

$user = mysqli_fetch_assoc($result);
http_response_code(200);

$_SESSION['user'] = $user['email'];
$_SESSION['authenicated'] = true;
$responce['user'] = $user;

echo json_encode($responce);

closeConnection();
?>
