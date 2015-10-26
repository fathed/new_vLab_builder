/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var holder = document.getElementById('imageProcessor'),
        state = document.getElementById('status'),
        images = [],
        bodyText = [],
        currPage = 0, //the page we are currently on
numOfPages = 0, //simple cunter for the number of pages
projName = '',
        currHotSpot = 0;




function init() {
    if (typeof window.FileReader === 'undefined') {
         state.className = 'fail';
    } else {
         state.className = 'success';
        //state.innerHTML = 'File API & FileReader available';
    }
    
    holder.ondragover = function () {
        //  this.className = 'hover';
        return false;
    };
    
    holder.ondragend = function () {
        // this.className = '';
        return false;
    };
    
    holder.ondrop = function (e) {
        //this.className = '';
        e.preventDefault();
        
        var file = e.dataTransfer.files[0],
                reader = new FileReader();
        reader.onload = function (event) {
            $.post('upload.php', {projectName: removeWhiteSpace(projName), item: file.name, uri: event.target.result}, function (response) {
            }).success(function () {
                buildPage(file.name);
            });
            images.push(event.target.result);//hold the image location
            //the thumbs represent a slide
            addThumbnailTitles();
        };
        
        reader.readAsDataURL(file);
        
        return false;
    };
    
    loadPages();
    
    
    //key presses
    $(document).keydown(function (e) {
        //add hotspot
        if (e.keyCode == 72 && e.ctrlKey) {
            //currPage   
            $("#page" + currPage).find('.imageCont').append('<div rel="hotspot" id="hs' + currHotSpot + '" class="hotspot"></div>');
            
            initHotSpots();
            currHotSpot++;
            e.preventDefault();
        }
        
    });
    
    
    
    
    
    
    $("#form").show().siblings().hide();
    $(".btn").click(function (e) {
        var theID = $(this).attr('id');
        switch (theID) {
            case "saveBtn":
                bodyText = [];
                getAllPages();
                saveProject();
                break;
            case "buildBtn":
                buildHTML();
                break;
            case "buildProjectStart":
                projName = $("#projectName").text();
                $.post('makeDirectories.php', 'projectName=' + removeWhiteSpace(projName), function () {
                }).success(function () {
                    $("#form").hide().siblings().show();
                });
                break;
        }
        e.preventDefault();
    });
    
    
}







function loadPages() {
    $.getJSON("getProjects.php", function (data) {
        $.each(data, function (index, value) {
        
            $("#listProjects").append('<div class="projectItem">' + value + '</div>');
        });
    }).success(function () {
        initProjectBtns();
    });
}





//make sure all the hotspots go live
function initHotSpots() {
    $('.hotspot').each(function () {
        $(this).draggable().on().resizable();
        
        /*
        $(this).toggleClass('ui-resizable');
       
       
        $(this).mousedown(function () {
            $(this).draggable({disabled: false}).toggleClass('draggingIcon');
        });
        
        $(this).mouseup(function () {
            $(this).draggable({disabled: true}).toggleClass('draggingIcon');
        });
        
        $(this).click(function(){
            //ui-resizable
          
            if(resizing){
                $(this).resizable('destroy');
                resizing = false;
            }else{
                $(this).resizable();
                resizing = true;
            }
        });
        */
        
        // console.log($(this).attr('id'));
        $(this).dblclick(function () {
            // alert("Handler for .dblclick() called.");
            $(this).remove();
        });
    });
}

//init the title page project buttons
function initProjectBtns() {
    /*
     * in order to keep track of what the last page was and not inturupt the hotspots
     * i need to get each page id - which has a number,
     * strip away all but that number and make the numOfPages equal that
     */
    numOfPages = 0;
    $(".projectItem").on('click', function () {
        projName = $(this).text();//get the title of the project & pass the project name to the holder var
        $.get("projects/" + removeWhiteSpace(projName) + "/" + removeWhiteSpace(projName) + "_raw.txt", function (data) {
            bodyText = data.split(",");//load the raw file and push to the holder array
        }).success(function () {
            for (var i = 0; i < bodyText.length; i++) {
                appendPrevSlides(bodyText[i]);
                
                //console.log(numOfPages);
            }
            addThumbnailTitles();
            initHotSpots();
            $("#form").hide().siblings().show();
        });
    });
}

function appendPrevSlides(e) {
    $("#imageListed").prepend(specialCharacters_display(e));
    // console.log(specialCharacters_display(e))
    // var theThumbTitle = $("#imageListed").find('.titleText').text();
    // buildThumbNails();
}

/*
 function buildThumbNails() {
 var getTitle = $("#page" + numOfPages).find('.titleText').html();
 $("#thumbList").append('<li class="thumbR" id="thumb' + numOfPages + '">item: ' + getTitle + '</li>');
 initThumbs();
 numOfPages++;//get the start count for the next page
 }
 */

function addThumbnailTitles() {
    var pageNum = $(".pages").length;
    $("#thumbList").html('');
    /*
     * i want to get the zero indexed page title and make that the first list item every time
     */
     $(".pages").each(function(){
        var tt = $(this).attr('id');
console.log('t: '+tt); 
     });
    
    for (var i = 0; i < pageNum; i++) {
        var pagePlace = $("#page" + i).find('.titleText').text();
        
        $("#thumbList").append('<li class="thumbR" id="thumb' + i + '">item: ' + pagePlace + '</li>');
    }
    initThumbs();
}

function getAllPages() {
    $(".entry").each(function () {
        var r = $(this).find('.pages').attr('id');
        var t = r.replace('page', '');
        
        //get the title of the page - if ther eis one- and make that the id of the page
        var pageTitle = $(this).find('.pages').text();
        var addID = removeWhiteSpace(pageTitle);
        $(this).attd('id',addID);
       
        
        bodyText.push(specialCharacters_convert('<div class="entry" id="ent' + t + '">' + $(this).html() + '</div>'));
    });
}


/*
 * build a thumbnail for each entry
 * the thumbnail can be clicked on to bring up the entry for editing
 */
function initThumbs() {
    showtheSlide();//hide all but the first entry after build
    $(".thumbR").on('click', function () {
        var t = $(this).attr('id').replace('thumb', '');
        currPage = t;//keep track of the page we just loaded
        showtheSlide();//hide all but they page we want
    });
}


function showtheSlide() {
    $("#ent" + currPage).show().siblings().hide();//hide all but they page we want
}


function buildPage(e) {
    var page = '';
    page += '<div class="entry" id="ent' + numOfPages + '">';
    page += '<div class="pages" >';
    page += '<div class="titleText" contenteditable ></div>';
    page += '<div class="clearer"></div>';
    page += '<div class="imageCont"> <img src="projects/' + removeWhiteSpace(projName) + '/images/' + e + '" alt=""  border="0" width="900" height="500"/></div>';
    page += '<div class="textCols" contenteditable></div>';
    page += '</div>';
    page += '</div>';
    
    numOfPages++;
    
    $("#imageListed").prepend(page);
    
    initThumbs();
}

function saveProject() {
    
    $.post('saveFile.php', {projectName: removeWhiteSpace(projName) + "_raw", projectBody: bodyText.toString(), projectFileType: "txt"}, function () {
    }).success(function () {
        addThumbnailTitles();
    });
}


function buildHTML() {
    var head = '<!doctype html><html ng-app><head><meta charset="utf-8"><title>' + projName + '</title><link rel="stylesheet" type="text/css" href="../css/body.css"><link rel="stylesheet" type="text/css" href="../css/common.css"></head><body><div id="pageNav"><a href="#" id="home" name="page0">Home</a><a href="#" name="backBtn" id="backBtn">&lt;</a> </div><div id="container">',
            body = '',
            footer = '</div><script src="../js/jquery-1.10.2.js"><\/script><script src="../js/helios.js"><\/script></body></html>';
    $(".entry").each(function () {
        var html = $(this).html(), //get the html again
        removeOldURL = html.replace('projects/' + projName + '/', '');//remove the url used for the builder
        body += removeOldURL;
    });
    $.post('saveFile.php', {projectName: removeWhiteSpace(projName), projectBody: head + body + footer, projectFileType: "html"}, function () {
    });
}