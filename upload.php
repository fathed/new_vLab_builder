<?php

if (isset($_POST["projectName"])) {
   file_put_contents("projects/".$_POST["projectName"]."/images/".$_POST["item"],file_get_contents("data://".$_POST["uri"]));
}
?>