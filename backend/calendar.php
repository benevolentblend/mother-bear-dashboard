<?php
session_start();

require('mysql_connect.php');

$responce = new stdClass();
$responce->success = true;
$responce->events = array();

if(!isset($_SESSION['authenicated']) || !($_SESSION['user'])) {
  http_response_code(401);
  $responce->success = false;
  $responce->message = 'Not authenicated.';
  echo json_encode($responce);
  die();
}

$email = $_SESSION['user'];

openConnection();

/* Select student courses from the course links
table where the email = $email */
$query = 'SELECT courses.COURSE_TITLE as title, courses.START_TIME '.
  'as starttime, courses.END_TIME as endtime, courses.SUN, courses.MON, '.
  'courses.TUES, courses.WED, courses.THURS, courses.FRI, courses.SAT '.
  'FROM course_links INNER JOIN users on users.id = course_links.USER_ID '.
  'INNER JOIN courses on courses.COURSE_ID = course_links.COURSE_ID'.
  ' WHERE users.email = "'.
  mysqli_escape_string($connection, $email).'";';
$responce->query = $query;
$result = runQuery($query);

while($user = mysqli_fetch_assoc($result)) {
  $responce->events[] = $user;
}

echo json_encode($responce);

closeConnection();
?>
