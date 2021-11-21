<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
header('Access-Control-Allow-Headers: Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli($_GET['servername'], $_GET['username'], $_GET['password'], $_GET['dbname']);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {

	$target_dir = "images/";

	if($_GET['online'] == "true") $tail = "https:";
	else  $tail = "http:";
		
	$url = $data->imageurl;			
	
	$parts = explode('/',$url);
	$dir = $tail."//".$_SERVER['SERVER_NAME'];
	for ($i = 0; $i < count($parts); $i++) {
		$imagefile = $parts[$i];
	}

	$target_file = $target_dir.$imagefile;			
	
	$sql="DELETE from ".$_GET['tbname']." WHERE _id = '$data->_id'";

	$qry = $conn->query($sql);	

	$stat = "failed!";
	if (file_exists($target_file)) {
		unlink($target_file);
		$stat = "success!";
	}

	$log  = "api: "."http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]".' - '.date("F j, Y, g:i a").PHP_EOL.
	"Source url: ".$data->imageurl .PHP_EOL.		
	"Target File: ".$target_file .PHP_EOL.		
	"Status: ".$stat.PHP_EOL.		
	"servername: ".$server.PHP_EOL.		
	"username: ".$user.PHP_EOL.						
	"id: ".$id.PHP_EOL.						
	"-------------------------".PHP_EOL;
	file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);								

	echo json_encode($qry);	
}
$conn->close();
?>