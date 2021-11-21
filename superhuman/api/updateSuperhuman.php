<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
header('Access-Control-Allow-Headers: Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');

$data = json_decode(file_get_contents("php://input"));

$imgUrl = $data->imageurl;
$found = strpos($imgUrl, '/');
if($found == "") {

	$target_dir = "images/";

	$url = $_SERVER['REQUEST_URI'];

	if($_GET['online'] == "true") $tail = "https:";
	else  $tail = "http:";

	$parts = explode('/',$url);
	$dir = $tail."//".$_SERVER['SERVER_NAME'];
	for ($i = 0; $i < count($parts) - 2; $i++) {
		$dir .= $parts[$i] . "/";
	}	
	$imgUrl = $dir.$target_dir.$data->imageurl;
}
		
$data->name = str_replace("'", "`", $data->name);
$data->description1 = str_replace("'", "`", $data->description1);
$data->description2 = str_replace("'", "`", $data->description2);
$data->imageurl = str_replace("'", "`", $data->imageurl);
$data->alterego = str_replace("'", "`", $data->alterego);
$data->description = str_replace("'", "`", $data->description);
$data->height = str_replace("'", "`", $data->height);
$data->weight = str_replace("'", "`", $data->weight);
$data->power = str_replace("'", "`", $data->power);
$data->enemy = str_replace("'", "`", $data->enemy);

$conn = new mysqli($_GET['servername'], $_GET['username'], $_GET['password'], $_GET['dbname']);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
	$sql="UPDATE ".$_GET['tbname']." SET 
	heroorvillain = '$data->heroorvillain',
	description1 = '$data->description1',
	description2 = '$data->description2',
	alterego = '$data->alterego',
	description = '$data->description',
	height = '$data->height',
	weight = '$data->weight',
	power = '$data->power',
	enemy = '$data->enemy',
	postedby = '$data->postedby',
	imageurl = '$imgUrl' WHERE _id = '$data->_id'";
	
	$qry = $conn->query($sql);	
	
	echo json_encode($qry);	
}
$conn->close();
?>