/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getProjects() {
    var listItems = [];
    $.getJSON("getProjects.php", function (data) {
        $.each(data, function (index, value) {
            if (value != 'js' && value != 'css') {
               // $("#listProjects").append('<div class="projectItem">' + value + '</div>');
                listItems.push('<div class="projectItem">' + value + '</div>');
            }
        });
    }).done(function () {
        return listItems;
    }).success(function () {
        return true;
    }).fail(function () {
        return false;
    });
    
}