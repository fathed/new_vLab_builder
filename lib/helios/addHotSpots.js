//add new hotspot
function addHotSpots() {
    $("#addHotSpot").click(function () {
        $("#imageDrop").append(buildHotSpot(hsID));//run the function to build the hot spot
        dragAndDrop();//make sure the drag and drop works for the new hot spots
        hsID++;
    });


  


}


