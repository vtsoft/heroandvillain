window.onload = function() {
    var screenHeight = $(this).height();
    $("#super-human-sidebar").css("height", screenHeight);
    $("#pageClickDiv").css("height", 150);
    // console.log(screenHeight);
    $("#pageClickDiv").css("margin-top", screenHeight - 50);
    $(".showPage").css("margin-top", screenHeight - 80);
}

$(window).resize(function() {
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    if (screenWidth > 1024) {
        $("#super-human-sidebar").css("height", screenHeight);
    } else $("#super-human-sidebar").css("height", screenHeight * .50);
    $("#pageClickDiv").css("margin-top", screenHeight - 50);
    $(".showPage").css("margin-top", screenHeight - 80);
});

$(function() {
    var offset = $("#super-human-sidebar").offset();
    $(window).scroll(function() {
        if ($(window).scrollTop() > offset.top) {
            $("#super-human-sidebar").stop().animate({
                marginTop: $(window).scrollTop() - offset.top
            });
        } else {
            $("#super-human-sidebar").stop().animate({
                marginTop: 0
            });
        }
    });
});