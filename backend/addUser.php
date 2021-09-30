<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';

$database = new Database();
$conn = $database->getConnection();

// POST DATA
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


    $insertUser = mysqli_query($conn, "INSERT INTO `users`(`first_name`,`last_name`,`dob`, `created`) VALUES('$firstName', '$lastName','$dob', '2018-12-05 12:39:16')");
    if ($insertUser) {
        echo json_encode(["success" => 1, "msg" => "User Inserted successfully."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
