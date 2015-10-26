/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function makeDirectory(projName) {
    $.post('makeDirectories.php', 'projectName=' + removeWhiteSpace(projName), function () {
    }).success(function () {
        //$("#form").hide().siblings().show();
        return true;
    }).fail(function(){
        return false;
    });
}