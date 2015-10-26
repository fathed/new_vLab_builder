$("#page0").show().siblings().hide();
/*
var parentItem = "";

$("#backBtn").hide();

$("area").bind("click", function () {
    var i = $(this).attr("conn"),
            parentItem = $(this).attr("section");
    $("#" + i).show().siblings().hide();
    $("#backBtn").show()
});
$("a").click(function () {
    var i = $(this).attr("name");
    "page0" == i ? $("#" + i).show().siblings().hide() : $("#" + parentItem).show().siblings().hide(),
            $("#backBtn").hide()
}), $("div").click(function () {
    var i = $(this).attr("id");
    "splash" == i && $("#page0").show().siblings().hide()
});*/


$(document).ready(function() {
	$("#nav").hide().delay(800).slideDown(300,'easeOutExpo');
	$("#logo").delay(1100).animate({left:'200px', opacity:'1.0'},600,'easeOutExpo');
	$("#subNavText").delay(1400).animate({left:'200px',opacity:1},600,'easeOutExpo');
	$("#backBtn").hide().delay(1900).fadeIn(200);
	$(".imageCont").hide().delay(1700).fadeIn(200);
	$(".titleText").hide().delay(1900).fadeIn(500);
	$(".textCols").hide().delay(2400).fadeIn(500);
});