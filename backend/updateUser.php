<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
  isset($data->firstName)
  && isset($data->lastName)
  && isset($data->dob)
  && !empty(trim($data->firstName))
  && !empty(trim($data->lastName))
  && !empty(trim($data->dob))
) {
  $firstName = mysqli_real_escape_string($conn, trim($data->firstName));
  $lastName = mysqli_real_escape_string($conn, trim($data->lastName));
  $dob = mysqli_real_escape_string($conn, trim(date('Y-m-d', strtotime($data->dob))));
  $created = date('Y-m-d H:i:s');

  $updateUser = mysqli_query($conn, "UPDATE `users` SET `first_name`='$firstName',`last_name`='$lastName', `dob`='$dob',`created`='$created' WHERE `id`='$data->id'");
  if ($updateUser) {
    echo json_encode(["success" => 1, "msg" => "User Updated."]);
  } else {
    echo json_encode(["success" => 0, "msg" => "User Not Updated!"]);
  }
} else {
  echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
