<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_GET['projPath'])){
   $files1 = scandir($_GET['projPath']);
   echo json_encode($files1);
}
   
?>