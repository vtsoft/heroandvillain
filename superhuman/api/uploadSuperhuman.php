<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');

$isSecure = false;
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
    $isSecure = true;
}
elseif (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' || !empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on') {
    $isSecure = true;
}
$REQUEST_PROTOCOL = $isSecure ? 'https' : 'http';

$images_dir = "images/";
$target_dir = "upload/";
$oldFilename = $_POST['oldName'];
$newFilename = $_POST['newName'];

$url = $_SERVER['REQUEST_URI'];

$source_name = basename($_FILES["selectFile"]["name"]);
$imageFileType = pathinfo($source_name,PATHINFO_EXTENSION);


$source_file = $target_dir.$oldFilename;
$target_file = $target_dir.$newFilename;
$images_file = $images_dir.$oldFilename;
// $images_new = $images_dir.$newFilename;

$uploadOk = 1;

$log  = "api: ".$url.' - '.date("F j, Y, g:i a").PHP_EOL.
"UploadSuperhuman: ".PHP_EOL.
"Source Image Name: ".$_FILES["selectFile"]["name"].PHP_EOL.
"Actual Image File: ".$_FILES["selectFile"]["tmp_name"].PHP_EOL.
"Source Image Name: ".$source_file.PHP_EOL.
"Target Image Name: ".$target_file.PHP_EOL.
"-------------------------".PHP_EOL;
file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);


// $check = getimagesize($_FILES["selectFile"]["tmp_name"]);
// if($check !== false) {
//     $isImage = "True, File is an image - " . $check["mime"] . ".";
//     $uploadOk = 1;
// } else {
//     $isImage = "False, File is not an image.";
//     $uploadOk = 0;
// }

if (file_exists($source_file)) {
    unlink($source_file);
    // $uploadOk = 0;
}

if (file_exists($target_file)) {
    unlink($target_file);
    // $uploadOk = 0;
}

// if (file_exists($images_new)) {
//     unlink($images_new);
//     // $uploadOk = 0;
// }

// if ($_FILES["selectFile"]["size"] <= 100000) {
//     // $target_file = $images_new;
//     echo json_encode("Image file no need to resize!");
// } else {
//     echo json_encode("Image file need to resize!");    
// }

// Check file size
/*
if ($_FILES["selectFile"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}*/

// if (is_uploaded_file($_FILES['selectFile']['tmp_name'])) {
//     $uploadOk = 0;    
// }

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    // echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// ob_start();

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 1) {
    
    if (move_uploaded_file($_FILES["selectFile"]["tmp_name"], $target_file)) {

        $log  = "source: ".$source_file.PHP_EOL.
        "target: ".$target_file.PHP_EOL.
        "Upload Success!".PHP_EOL.
        "-------------------------".PHP_EOL;

        if (file_exists($target_file)) {
            if (file_exists($images_file)) {            
                unlink($images_file);
            }
        }        
    } else {
        $log  = "source: ".$source_file.PHP_EOL.
        "target: ".$target_file.PHP_EOL.
        "Upload Failed!".PHP_EOL.
        "-------------------------".PHP_EOL;
    }
} else {
    $log  = "source: ".$source_file.PHP_EOL.
    "target: ".$target_file.PHP_EOL.
    "Upload Failed!".PHP_EOL.
    "-------------------------".PHP_EOL;
}
$log  = "source: ".$source_file.PHP_EOL.
"target: ".$target_file.PHP_EOL.
"-------------------------".PHP_EOL;
file_put_contents('./jong_'.date("j.n.Y").'.txt', $log, FILE_APPEND);    

// ob_end_clean();

?>