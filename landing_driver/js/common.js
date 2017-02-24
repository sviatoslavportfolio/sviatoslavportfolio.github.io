/*slider*/
$(document).ready(function () {
    $('.slider').slick();
});
$('.slider').slick({
    arrows: true
    , appendArrows: '.arrow'
    , prevArrow: '<i class="fa fa-angle-left slider-btn" aria-hidden="true"></i>'
    , nextArrow: '<i class="fa fa-angle-right slider-btn" aria-hidden="true"></i>'
});
/*mobile-menu*/
$('.mobile-menu-btn').click(function () {
    if ($('.header-nav').hasClass('transform270')) {
        $('.header-nav').removeClass('transform270');
    }
    else {
        $('.header-nav').addClass('transform270');
    }
});
/*mobile menu btn*/
$('.mobile-menu-btn').click(function () {
    if ($('.mobile-menu-btn').hasClass('transform180')) {
        $('.mobile-menu-btn').removeClass('transform180');
        $('.line1').removeClass('line1trans');
        $('.line3').removeClass('line3trans');
    }
    else {
        $('.mobile-menu-btn').addClass('transform180');
        $('.line1').addClass('line1trans');
        $('.line3').addClass('line3trans');
    }
});
/*scroll header*/
$(document).ready(function () {
    var $menu = $(".header-scroll-class");
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100 && $(window).width() > 767) {
            $menu.addClass("header-scroll");
        }
        else {
            $menu.removeClass("header-scroll");
        }
    });
});
/*login block*/
$('.login-icon').click(function () {
    if ($('.login-icon').hasClass('transform330')) {
        $('.login-icon').removeClass('transform330');
        $('.login-block').removeClass('transform330');
    }
    else {
        $('.login-icon').addClass('transform330');
        $('.login-block').addClass('transform330');
    }
});