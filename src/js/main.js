$(document).ready(function () {
    var _document = $(document);

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


    /* Video popup */
    _document.on('click', '.mfp-close', closeMfp);

    function closeMfp(){
        $.magnificPopup.close();
    }

    $('[js-popupVideo]').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-buble',
        callbacks: {
            beforeOpen: function() {
                // startWindowScroll = _window.scrollTop();
                // $('html').addClass('mfp-helper');
            }
        },
        patterns: {
            youtube: {
                index: 'youtube.com/',
                id: 'v=', // String that splits URL in a two parts, second part should be %id%
                // Or null - full URL will be returned
                // Or a function that should return %id%, for example:
                // id: function(url) { return 'parsed id'; }

                src: '//www.youtube.com/embed/%id%?autoplay=1&controls=0&showinfo=0' // URL that will be set as a source for iframe.
            }
        },
        closeMarkup: '<button class="mfp-close"><a href="" class="close-button"></a></button>'
    });

    $('select').niceSelect();


    $('.js-show-categories').click(function(){
        $(this).toggleClass('open');

        $('.categories').toggleClass('open');
    });


    /*$(window).bind('scroll',function(e){
        parallaxScroll();
    });

    function parallaxScroll(){
        var scrolled = $(window).scrollTop();
        $('.cube:not(.footer .cube)').css('top',(0-(scrolled*.25))+'px');
    }*/
});