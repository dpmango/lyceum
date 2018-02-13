$(document).ready(function () {
	
	$('.js-open-menu').on('click', function () {
        $('nav').fadeIn();
    })

    $('.js-close-menu').on('click', function () {
        $('nav').fadeOut();
    })
});