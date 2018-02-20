$(document).ready(function () {
    var _document = $(document);

	$('.js-open-menu').on('click', function () {
        $('nav').fadeIn();
    });

    $('.js-close-menu').on('click', function () {
        $('nav').fadeOut();
    });

    /* SLIDER */
    $('.slider, .looks-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: "<span class='slider__arrow slider__arrow--prev'></span>",
        nextArrow: "<span class='slider__arrow slider__arrow--next'></span>",
        autoplay: true,
        autoplaySpeed: 4000
    });

    /* VACANCIES SWITCHER */
    $('.js-vacancies').on('click', function () {
        $(this).find('.vacancies__description').slideToggle('slow');
        $(this).find('.vacancies__btn').fadeToggle('slow');
    });


    /* VIDEO POPUP */
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

    /* BEAUTIFUL SELECTS*/
    $('select').niceSelect();

    /* LEFT SIDEBAR WITH CATEGORIES*/
    $('.js-show-categories').click(function(){
        $(this).toggleClass('open');
        $('.categories').toggleClass('open');
    });

    /* CONTACTS MAPS */
    $('.js-map').on('click', function () {
       $(this).toggleClass('contacts__address--open');
       $(this).next('.contacts__map').slideToggle('slow');
    });

    /* CHANGE REGISTRATION TYPE*/
    $('.js-registration-type').on('click', function () {
       var type = $(this).prev('[data-type]').data('type');
       $('.is-open[data-src]').toggleClass('is-open');
       $("[data-src='" + type + "']").toggleClass('is-open');
    });

    /* ADD FIELDS FOR REGISTRATION */
    $('.js-registration-plus').on('click', function () {
       var column = $(this).closest('.registration__col');
       var fields = $(column).find('.js-add-more-fields').html();
       $(column).find('.js-add-more-fields').after(fields);
    });

    /* MASKS */
    $('.js-date').mask("0.00.0000");
    $('.js-phone').mask('+7(999) 999-9999');

    // SHOW SELECTED IMAGE
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.js-showSelectedImage').attr('src', e.target.result);
                $('.js-showSelectedImage').addClass('showing');
                $('.js-add-photo').addClass('bgn');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('.js-photo-input').on('change', function () {
        readURL(this);
    });

    /* Open popup*/
    $('.js-open-popup').magnificPopup({
        type:'inline',
        midClick: true,
        mainClass: 'mfp-fade'
    });

});