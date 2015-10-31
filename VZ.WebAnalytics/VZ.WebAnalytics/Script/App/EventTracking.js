$(document).delegate("a", "click", function () {

    alert("Goodbye 1!"); // jQuery 1.4.3+

});
var IPAddress = "";
$(document).ready(function () {

    getIPAddress();

});


$(document).delegate("input", "click", function () {
    var location = "";
    if (window.location)
    {
        var thisobj = $(this);
        
        
        location = window.location.href;
        pathName = window.location.pathname;
        
        AppTitle = $(document)[0].title;

        ClickName = thisobj.val();
        clicktype = thisobj.attr("type");
        
    }
   // this.
    alert("Goodbye!"); // jQuery 1.4.3+

});
function getIPAddress()
{
    $.getJSON("http://jsonip.com?callback=?", function (data) {
        IPAddress = data.ip;
    });
}

var start, end;
window.onload = function () {
    //start = Date.getTime();
    setTimeout(function () {
        var t = performance.timing;
        var t1 = t.loadEventEnd - t.responseEnd;
      //  alert(t1);
        console.log(t.loadEventEnd - t.responseEnd);
    }, 0);
}
$(window).unload(function () {
    //alert("end");
   // alert($(document)[0].title);
   // end = Date.getTime();
    //$.ajax({
    //    url: "log.php",
    //    data: { 'timeSpent': end - start }
    //})
});