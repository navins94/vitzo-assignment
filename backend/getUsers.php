<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';

$database = new Database();
$conn = $database->getConnection();

$num_rec_per_page = 20;

if (isset($_GET["page"])) {
    $page = $_GET["page"];
} else {
    $page = 1;
};

$start_from = ($page - 1) * $num_rec_per_page;

$total = "SELECT * FROM users";
$query = "SELECT * FROM users Order By id asc LIMIT $start_from, $num_rec_per_page";


$select = mysqli_query($conn, $query);

if ($select->num_rows > 0) {
    while ($row = mysqli_fetch_array($select, MYSQLI_ASSOC)) {
        $data[] = $row;
    }
    $respose['data'] = $data;
    $result = mysqli_query($conn, $total);
    $respose['total'] = mysqli_num_rows($result);
    echo json_encode($respose);
} else {
    echo json_encode(["success" => 0, "msg" => "No item found."]);
}
