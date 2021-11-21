window.onload = function() {
    var screenHeight = $(this).height();
    $("#super-human-sidebar").css("height", screenHeight);
    $("#pageClickDiv").css("height", 150);
    // console.log(screenHeight);
    $("#pageClickDiv").css("margin-top", screenHeight - 50);
}

$(window).resize(function() {
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    if (screenWidth > 1024) {
        $("#super-human-sidebar").css("height", screenHeight);
    } else $("#super-human-sidebar").css("height", screenHeight * .50);
    $("#pageClickDiv").css("margin-top", screenHeight - 50);
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

    $("#upload").change(function() {
        alert('changed!');
    });

    $("#selectNewFile").change(function() {
        alert('selectNewFile Works!!');
    });

    $("#selectOldFile").change(function() {
        alert('selectOldFile Works!!');
    });

    $("#pageValue li a").click(function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });

});