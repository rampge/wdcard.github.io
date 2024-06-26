

var is_scrolling = false;
var page = 1;
var total_page = 6;
var scroll_wrap = $('.scroll_wrap')
var contentsHeight = 0;
var gallery_check = false;
var pop_hidden = false;
var scroll_down_bol = false;
var pageCheck = [false, false, false, false, false, false]

document.addEventListener('DOMContentLoaded', function () {
    $('.first').addClass('visible');
    $('.second').addClass('visible');
    $('.third').addClass('visible');
    $('.video_wrap').addClass('visible');
    
    var video_play = setTimeout(function () {
        $('.main_video').get(0).play();
    }, 2200)

    var scroll_down = setTimeout(function () {
        $('html, body').animate({
            scrollTop: 150
        }, 600);
        scroll_down_bol = true;
        // $('.popup').addClass('toggle')
    }, 5000)
    var scroll_pop = setTimeout(function () {
        $('.popup').addClass('toggle')
        pop_hidden = true;
    }, 10000)
    var mapOptions = {
        center: new naver.maps.LatLng(37.54220795057724, 126.95224350253976),
        zoom: 16
    };
    var map = new naver.maps.Map('map', mapOptions);
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.54220795057724, 126.95224350253976), // 마커의 위치
        map: map
    });
    $(window).on('wheel', function (event) {
        clearTimeout(scroll_pop)
        if($('.popup').hasClass('toggle')){
            $('.popup').removeClass("toggle")
            $('.popup').addClass("hide")
        }
    });
    $(window).on('touchstart', function (event) {
        touchStartY = event.originalEvent.touches[0].clientY;
    });
    $(window).on('touchmove', function (event) {
        touchMoveY = event.originalEvent.touches[0].clientY;
        if (touchStartY > touchMoveY) {
            clearTimeout(scroll_pop)
            if($('.popup').hasClass('toggle')){
                $('.popup').removeClass("toggle")
                $('.popup').addClass("hide")
            }
        }
    });
    $(window).on("scroll", function (e) {
        clearTimeout(scroll_down)
        $('.page').each(function () {
            var tmpdepth = 150;

            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var bottomOfWindow = $(window).scrollTop() + $(window).height();

            if (elementPos + tmpdepth < bottomOfWindow) {
                $(this).find(".overlay > .paragraph").addClass('visible');

                if ($("#page3 > .overlay > .paragraph:eq(4)").hasClass("visible")) {
                    if (!gallery_check) {
                        setTimeout(function () {
                            gallery_check = true;
                            $('.gallery').slick("slickPlay")
                        }, 2800)
                    }
                }
            }

        });


    });

    $('.account_open').on('click', function () {
        if ($(this).siblings('.account_wrap').attr("data-set") != "open") {
            $(this).siblings('.account_wrap').attr("data-set", "open");
            $(this).siblings('.open_button').attr("data-set", "open");
            $(this).attr("data-set", "open");
        }
        else {
            $(this).siblings('.account_wrap').attr("data-set", "close");
            $(this).siblings('.open_button').attr("data-set", "close");
            $(this).attr("data-set", "close");
        }
    })
    $('.copy_button').on('click', function () {
        var temp_account = $(this).attr("data-set");
        window.navigator.clipboard.writeText(temp_account).then(() => {
            alert("클립보드에 저장 되었습니다.")
        });
    })


    $('.gallery').slick({
        slidesToShow: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
    });

    $('.gallery').on("swipe", function () {
        $('.gallery').slick('slickPause');
    })
});
