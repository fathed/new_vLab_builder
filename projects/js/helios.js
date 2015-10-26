var current_page = [];
var currPageLen = 0;

$('.pages').each(function () {
    var startHere = $(this).attr('rel');
    //console.log(startHere);
    if (startHere == 'page0') {
        $(this).show().siblings().hide();
    }

});

$(".hotspot").html('');

$(".hotspot").click(function () {
    getShownPageID();
    var target = $(this).attr('tar');
    $("#" + target).show().siblings().hide();
    $("#" + target).hide().delay(300).slideDown(300, 'easeOutExpo');
});


function getShownPageID() {
    $('.pages').each(function () {
        if ($(this).is(':visible')) {
            current_page.push($(this).attr('id'));
            console.log(current_page);
        }

    });
}

$(".bbtn").click(function () {
    currPageLen = current_page.length-1;//refresh the count with the exact number of items in the array minus one since an array is zero indexed
    var item = $(this).attr('id');//what button are we clicking
    switch (item) {
        case "backBtn":
            $("#" + current_page[currPageLen]).show().siblings().hide();
            current_page.pop();
            break;
        case "subNavText":
            $("#" + current_page[0]).show().siblings().hide();//go back to the beggining - always the zroe slide
             current_page = [];//clear the array to start over
            break;
    }
   // console.log(current_page)
});

$(document).ready(function () {
    $("#nav").hide().delay(800).slideDown(300, 'easeOutExpo');
    $("#logo").delay(1100).animate({left: '5px', opacity: '1.0'}, 600, 'easeOutExpo');
    $("#subNavText").delay(1400).animate({left: '5px', opacity: 1}, 600, 'easeOutExpo');
    $("#backBtn").hide().delay(1900).fadeIn(200);
    $(".imageCont").hide().delay(1700).fadeIn(200);
    $(".titleText").hide().delay(1900).fadeIn(500);
    $(".textCols").hide().delay(2400).fadeIn(500);
});