<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); 
header('Access-Control-Allow-Headers: Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');

$fk = $_GET['fk'];

$log  = "api: "."http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]".' - '.date("F j, Y, g:i a").PHP_EOL.	
"filter GET: ".$_GET['fk'].PHP_EOL.		
"-------------------------".PHP_EOL;
file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);	

$conn = new mysqli($_GET['servername'], $_GET['username'], $_GET['password'], $_GET['dbname']);

if ($conn->connect_error) {
	echo json_encode("Connection failed!");		
} else {

	if($fk=="all") {
		$sql = "SELECT * FROM ".$_GET['tbname']." order by datepost desc";
		$log  = "Pass All: ".$fk.PHP_EOL.
		"sql: ".$sql.PHP_EOL.
		"-------------------------".PHP_EOL;
		file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);	
	} else {
		$sql = "SELECT * FROM ".$_GET['tbname']." where heroorvillain = '$fk' order by name asc";
		$log  = "Pass k: ".$fk.PHP_EOL.
		"sql: ".$sql.PHP_EOL.
		"-------------------------".PHP_EOL;
		file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);	
	}

	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$data = array();
		while($row = $result->fetch_assoc()) {
			$data[] = $row;
		}
		$log  = "Pass Data: ".$fk.PHP_EOL.
		"-------------------------".PHP_EOL;
		file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);			
		echo json_encode($data);		
	} else {
		$log  = "Pass Empty data!: ".$fk.PHP_EOL.
		"-------------------------".PHP_EOL;
		file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);			
		echo json_encode("Empty data!");		
	}		
}
$conn->close();
?>