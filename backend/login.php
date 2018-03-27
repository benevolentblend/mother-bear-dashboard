<?php
require('mysql_connect.php');
http_response_code(401);
$responce = new stdClass();
$responce->success = true;
$responce->message = "";

$email = $_POST['email'];
$password = $_POST['password'];

openConnection();

$responce->values = mysqli_escape_string($connection, $email);

/* Select user where email and password match */
$query = "SELECT * FROM `users` WHERE `email` = '".
mysqli_escape_string($connection, $email)."' AND `password` ='".
mysqli_escape_string($connection, $password)."';";
$responce->query = $query;
$result = runQuery($query);
if(mysqli_num_rows($result) < 1) {
  closeConnection();
  $responce->success = false;
  $responce->message = "Invalid email and password combination.";
  echo json_encode($responce);
  die();
}

$user = mysqli_fetch_assoc($result);
http_response_code(200);

echo json_encode($responce);

closeConnection();
?>
