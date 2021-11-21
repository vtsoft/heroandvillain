<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
header('Access-Control-Allow-Headers: Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');

$data = json_decode(file_get_contents("php://input"));

$target_dir = "images/";

$url = $_SERVER['REQUEST_URI'];

if($_GET['online'] == "true") $tail = "https:";
else  $tail = "http:";

$urlnew = explode('.',$url);

$parts = explode('/',$url);
$dir = $tail."//".$_SERVER['SERVER_NAME'];
for ($i = 0; $i < count($parts) - 2; $i++) {
 $dir .= $parts[$i] . "/";
}

$imgUrl = $dir.$target_dir.$data->imageurl;

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
	if($data->name != "") {

		$sql="INSERT INTO ".$_GET['tbname']." (_id, name, heroorvillain, description1, description2, imageurl, alterego, description, height, weight, power, enemy, postedby, postaccess, datepost)
              VALUES ('$data->_id', '$data->name', '$data->heroorvillain', '$data->description1', '$data->description2', '$imgUrl', '$data->alterego', '$data->description', '$data->height', '$data->weight', '$data->power', '$data->enemy', '$data->postedby', '$data->postaccess', now())";			

		$qry = $conn->query($sql);
		
		if($qry) {
			echo json_encode("success!"); 				
		} else {
			echo json_encode("Failed!");			
		}

		// echo json_encode($qry);	
	
	}	
	$conn->close();
}
?>