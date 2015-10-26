<?php
if(isset($_POST["projectName"])){
    mkdir('projects/'.$_POST["projectName"]);
    mkdir('projects/'.$_POST["projectName"]."/images");
}
?>