$(document).ready(function () {
	
	$('.js-open-menu').on('click', function () {
        $('nav').fadeIn();
    });

    $('.js-close-menu').on('click', function () {
        $('nav').fadeOut();
    });

    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: "<span class='slider__arrow slider__arrow--prev'></span>",
        nextArrow: "<span class='slider__arrow slider__arrow--next'></span>",
        autoplay: true,
        autoplaySpeed: 4000
    });

    $('.js-vacancies').on('click', function () {
        $(this).find('.vacancies__description').slideToggle('slow');
        $(this).find('.vacancies__btn').fadeToggle('slow');
    });
});