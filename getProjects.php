<?php
$path = 'projects'; // '.' for current
$arr = array();
foreach (new DirectoryIterator($path) as $file) {
    if ($file->isDot()) continue;

    if ($file->isDir()) {
        array_push($arr , $file->getFilename());
    }
}

echo json_encode($arr);
?>