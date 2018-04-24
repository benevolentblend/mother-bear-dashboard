<?php
session_start();

$responce = array();
$responce['success'] = true;
$responce['message'] = "";

// if(!isset($_SESSION['authenicated']) || !$_SESSION['authenicated']) {
//   http_response_code(401);
//   $responce['success'] = false;
//   echo json_encode($responce);
//   die();
// }

require('mysql_connect.php');

// $userEmail = $_SESSION['email'];

$userEmail = $_GET['email'];

openConnection();

$query = "SELECT color1, color2, color3, layout FROM users WHERE email = '$userEmail';";

$result = runQuery($query);

if (!runQuery($query)) {
  $responce['message'] = mysqli_error($connection);
  $responce['success'] = false;

  echo json_encode($responce);
  closeConnection();
  die();
}

$user = mysqli_fetch_assoc($result);

$responce['message'] = "retrieved $userEmail colors";
$responce['color1'] = $user['color1'];
$responce['color2'] = $user['color2'];
$responce['color3'] = $user['color3'];
$responce['layout'] = $user['layout'];

echo json_encode($responce);
closeConnection();
 ?>
