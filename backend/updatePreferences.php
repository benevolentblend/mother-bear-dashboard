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

if(!isset($_POST['color1']) && !isset($_POST['color2']) && !isset($_POST['color3'])) {
  $responce['message'] = 'No values to update.';
  echo json_encode($responce);
  die();
}

require('mysql_connect.php');

$userEmail = $_SESSION['user'];


openConnection();
$updates = '';

if(isset($_POST['color1'])) {
  $updates .= 'color1="#'.$_POST['color1'].'", ';
}

if(isset($_POST['color2'])) {
  $updates .= 'color2="#'.$_POST['color2'].'", ';
}

if(isset($_POST['color3'])) {
  $updates .= 'color3="#'.$_POST['color3'].'", ';
}

if(isset($_POST['layout'])) {
  $updates .= 'layout="'.$_POST['layout'].'", ';
}

$updates = substr($updates, 0, -2);

$query = "UPDATE users SET $updates WHERE email = '$userEmail';";

if (!runQuery($query)) {
  $responce['message'] = mysqli_error($connection);
  $responce['success'] = false;

  echo json_encode($responce);
  closeConnection();
  die();
}

$responce['message'] = "updates $updates";
echo json_encode($responce);
closeConnection();
 ?>
