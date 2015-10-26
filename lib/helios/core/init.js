/*
 * Helios - J Gibbens 2015
 */
var numberOfPages = 0;
function init() {
    this.projName = ''; //ref to project name
    this.html = '';
    this.image = '';
    this.currPage = '';
    $("#form").show().siblings().hide();
    // $("#").show().siblings().hide();
    initProjects();
}


function replaceableImages() {

    //$(".imageCont").bind('dragenter', ignoreDrag).bind('dragover', ignoreDrag).bind('drop', drop);
    $(".imageCont").bind('dragenter', ignoreDrag).bind('dragover', ignoreDrag).bind('drop', drop);

}


function uploadImage(uri, name, target) {
    $.post('upload.php', {projectName: removeWhiteSpace(init.projName), item: name, uri: uri}, function (response) {
    }).success(function () {
        target.find('img').attr('src', 'projects/' + removeWhiteSpace(init.projName) + '/images/' + name);
    }).fail(function () {
    });
}


var canDropImage = true;
function drop(e) {
    ignoreDrag(e);

    if (canDropImage) {
        var myFileReader = new FileReader(),
                dt = e.originalEvent.dataTransfer,
                files = dt.files;

        if (files.length > 0) {
            var file = dt.files[0],
                    target = $(this);

            myFileReader.onload = (function (file) {
                return function (e) {
                    uploadImage(e.target.result, file.name, target);
                };
            })(file);
            myFileReader.readAsDataURL(file);
        }
    }
}

function ignoreDrag(e) {
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
}


function keyHandler() {
    //key presses
    $(document).keydown(function (e) {
        //add hotspot
        if (e.keyCode == 9) {
            // e.preventDefault();
        }
        //hotkeys
        if (e.ctrlKey) {
            if (e.keyCode == 72) {
                $("#" + init.currPage).find('.hotspotCont').append('<div rel="hotspot" id="hs' + init.currPage + '" class="hotspot"></div>');
                initHotSpots('#hs' + init.currPage);
                e.preventDefault();
            }
            if (e.keyCode == 83) {
                getAllPages();
                saveProject();
                e.preventDefault();
            }

            if (e.keyCode == 81) {
                appendPrevSlides(newSlide());
                e.preventDefault();
            }

        }
    });
}
function deleteHotspot() {
    $('.hotspot').dblclick(function () {
        // $(this).resizable();
        var r = confirm("Are you sure you want to delete this hotspot?");
        if (r == true) {
            $(this).remove();
        } else {
        }

    });
}
//make sure all the hotspots go live
function initHotSpots(e) {

    $(e).each(function () {
        $('.hotspot').draggable();
        $('.hotspot').resizable();

        $('.hotspot').click(function () {
            $(this).resizable();
            $(this).resizable('destroy');
            $(this).resizable();
        });
        $(".hotspot").droppable({
            drop: function (event, ui) {
                $(this).attr('tar', ui.draggable.attr("rel"));
                $(this).html(ui.draggable.attr("rel"));
            }
        });
    });
}






function imageDrop() {
    $.getJSON("loadImages.php", {projPath: 'projects/' + removeWhiteSpace(init.projName) + '/images/'}, function (data) {
        $.each(data, function (index, value) {
            if (value != '.' && value != '..')
                appendPrevSlides(newSlide(value));
        });
    });
}

/*
 * get the pre-existing projects
 */
function initProjects() {
    $.getJSON("getProjects.php", function (data) {
        $.each(data, function (index, value) {
            if (value != 'js' && value != 'css' && value != null && value != 'images') {
                $("#listProjects").append('<input rel="' + removeWhiteSpace(value) + '" class="loadingProject" type="button" value="' + value + '">');
            }

        });
    }).success(function () {
        initBtns();
    }).fail(function () {
        console.log('fail');
    });
}


/*
 * change the id of the start page before saving
 */
function startPageID() {
    var page = $('input[type=radio][name=thb]:checked').attr('rel');
    $(".pages").each(function () {
        // console.log(page)

        var theID = $(this).attr('id');
        // console.log(theID)
        if (page == theID) {
            $(this).attr('rel', 'page0');
        } else {
            $(this).attr('rel', '');
        }
    });
}

/*
 * save the project to a raw file 
 */
function saveProject() {
    $.post('saveFile.php', {projectName: init.projName + "_raw", projectBody: init.html, projectFileType: "txt"}, function () {
    }).success(function () {
        // console.log('saved');
        rebuild();
    }).fail(function () {
        // console.log('Did not save');
    });
    ;
}


function buildHTML() {
    var head = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <title>' + init.projName + '</title><link rel="stylesheet" href="../css/boilerplate.css"><link rel="stylesheet" href="../css/page.css"></head> <body><div id="nav"><div id="logo"></div><div id="subNavText" class="bbtn">Home</div><div id="backBtn" class="bbtn">Back</div></div><div id="container"> ',
            body = specialCharacters_display(init.html),
            footer = '</div><script src="../js/jquery-1.10.2.js" type="text/javascript"></script><script src="../js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script><script src="../js/helios.js" type="text/javascript"></script></body></html>';
    /**/

    $.post('saveFile.php', {projectName: init.projName, projectBody: head + body + footer, projectFileType: "html", fixURL: true}, function () {
    });
}
/*
 * build a new slide
 */
function newSlide(e) {
    var page = '';
    //  page += '<div class="entry" id="entry' + numberOfPages + '">';

    page += '<div class="pages" id="page' + numberOfPages + '" rel="' + numberOfPages + '">';
    page += '<div class="titleText" contenteditable >Slide ' + numberOfPages + '</div>';
    page += '<div class="clearer"></div>';
    page += '<div class="imageCont"><div class="hotspotCont"></div><img class="mainImage" src="projects/' + removeWhiteSpace(init.projName) + '/images/' + e + '" alt=""  border="0" width="900" height="500"/><div id="bottomShadow"><img src="../images/bottomShadow.png" class="bottomShad"></div></div>';
    page += '<div class="textCols" contenteditable></div>';
    page += '</div>';
    // page += '</div>';
    addThumbnails('slide');
    numberOfPages++;
    return page;
}
/*
 * build the initial file structure
 */
function buildProjectAssets() {
    makeDirectory(init.projName);
}

/*
 * the initial project load buttons
 */
function initBtns() {
    //existing project
    $('.loadingProject').click(function () {
        var theItem = $(this).attr('rel'); //i hold the project name in a rel attribute
        init.projName = theItem; //place the ref to the project we loaded

        loadPages();
        $("#form").hide().siblings().show();
    });
    //new project
    $("#formBuild").click(function () {
        init.projName = removeWhiteSpace($("#projectNameField").val());
        appendPrevSlides(newSlide());
        buildProjectAssets();
        saveProject();
        $("#form").hide().siblings().show();
    });
    //add a new slide
    $("#newSlide").click(function () {
        appendPrevSlides(newSlide());
    });
    //add a new slide
    $("#saveProject").click(function () {
        getAllPages();
        saveProject();
    });
    //rebuild the project

    $("#rebuildProject").click(function () {
        rebuild();
    });
    //init load all images
    $("#loadImagesNow").click(function () {
        imageDrop();
        $(this).hide();
    });
    //build the html
    $("#buildHtml").click(function () {
        buildHTML();
    });

    keyHandler();
}





function reInitAllHotspots() {
    //console.log(fixedTitle)
    //initHotSpots('#' + fixedTitle);
    $(".hotspot").each(function () {
        initHotSpots("#" + $(this).attr('id'));

    });
}

/*
 * make the list
 * if the slide hasn't been given a title then we just make the title slide and what ever slide number we are one
 * at the moment
 */
function addThumbnails(title, fixedTitle, checked) {
    if (title == null || title == "" || title == 'slide') {
        $("#thumbnails").append('<span class="theHotSpotTarget" rel="Slide_' + numberOfPages + '">&raquo;</span><input type="radio" class="theCheckBoxes" name="thb" rel="Slide_' + numberOfPages + '" id="t_' + numberOfPages + '"> <input type="button" rel="' + numberOfPages + '" class="thmb" value="Sldie ' + numberOfPages + '">&nbsp;&nbsp;<span class="delBtn" rel="' + numberOfPages + '">X</span><br>');
    } else {
        $("#thumbnails").append('<span class="theHotSpotTarget" rel="' + fixedTitle + '">&raquo;</span><input type="radio" class="theCheckBoxes" name="thb" rel="' + fixedTitle + '" id="t_' + fixedTitle + '"> <input type="button" rel="' + fixedTitle + '" class="thmb" value="' + title + '">&nbsp;&nbsp;<span class="delBtn" rel="' + fixedTitle + '">X</span><br>');
    }

    $(".theHotSpotTarget").draggable({cancel: false, revert: true, helper: "clone"});


    /*
     * here we get wonky. so the drag and drop works to replace the image but it also fire when I drop the 
     * page link on it. So I add a timeout so the bool canDropImage sets to true after the 
     * link icon has gone back home
     */
    $(".theHotSpotTarget").mousedown(function (e) {
        canDropImage = false;
        console.log(canDropImage);
        if (e.which == 1) {

            $(this).bind('mouseleave', function () {
                $('body').one('mouseup', function () {
                    setTimeout(function () {
                        canDropImage = true;
                        console.log(canDropImage);
                    }, 50)
                });
            });
            $(this).mouseup(function () {
                $(this).unbind('mouseleave');
                setTimeout(function () {
                    canDropImage = true;
                    console.log(canDropImage);
                }, 50)
            });
        }
    });



    //canDropImage
    checkForSelectedItems(checked, fixedTitle);
    //init the thumbnails to click
    $(".thmb").click(function () {
        var theID = $(this).attr('rel'); //the id of the target is stored in the rel attribute
        $("#" + theID).show().siblings().hide(); //show the corresponding div - hide the rest
        init.currPage = theID;
    });
}


function checkForSelectedItems(checked, fixedTitle) {
    if (checked) {
        $("#t_" + fixedTitle).prop("checked", true);
    }
}

/*
 * get the thumbnail title from each page
 */
function getThumbnailTitle() {
    $(".pages").each(function () {
        var title = stripOutSpecialChar($(this).find('.titleText').text()),
                rel = stripOutSpecialChar($(this).attr('rel'));
        //only show the page that was designated as the start page by clicking the radio button
        if (rel == 'page0') {
            $(this).show().siblings().hide();
            init.currPage = $(this).attr('id');
            addThumbnails(title, removeWhiteSpace(title), true);
        } else {
            addThumbnails(title, removeWhiteSpace(title), false);
        }

        $(this).attr('id', removeWhiteSpace(title));
    });

    initSlideDelete();
}

//listen for delete for slides
function initSlideDelete() {
    $(".delBtn").click(function () {

        var target = $(this).attr('rel');
        $("#" + target).remove();
        getAllPages();
        saveProject();

    });
}

/*
 * get all the pages for the save
 */
function getAllPages() {
    startPageID();
    init.html = specialCharacters_convert($("#imageListed").html());
}

/*
 * load a pre-exisitng project
 */
function loadPages() {
    $.get("projects/" + init.projName + "/" + init.projName + "_raw.txt", function (data) {
        //init.bodyText = data.split(",");//load the raw file and push to the holder array
        init.html = data;
        //if there is nothing to load then don't show the image button
        if (data != '') {
            $("#loadImagesNow").hide();
        }
    }).success(function () {
        appendPrevSlides(specialCharacters_display(init.html));
        getThumbnailTitle();
        reInitAllHotspots();
        replaceableImages();
        deleteHotspot();
        $(".bottomShad").hide();
    });
}
/*
 * build the project from the saved file
 */
function appendPrevSlides(e) {
    $("#imageListed").prepend(specialCharacters_display(e));
}

/*
 * rebuild the project we are currently on
 */
function rebuild() {
    //reset everything then reload
    init.html = '';
    $("#thumbnails").html('');
    $("#imageListed").html('');
    loadPages();
}