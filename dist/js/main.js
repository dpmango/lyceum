$(document).ready(function () {
    var _document = $(document);

	$('.js-open-menu').on('click', function () {
        $('nav').fadeIn(200);
    });

    $('.js-close-menu').on('click', function () {
        $('nav').fadeOut(200);
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
    if(window.screen.width < 992) {
        $('.js-vacancies').on('click', function () {
            $(this).find('.vacancies__description').slideToggle(300);
            $(this).find('.vacancies__btn').fadeToggle(300);
        });
    }



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
       $(this).next('.contacts__map').slideToggle(300);
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
            var label = $(input).prev('label');
            reader.onload = function (e) {
                var image = label.find('img.js-showSelectedImage');
                $(image).attr('src', e.target.result);
                $(image).addClass('showing');
                $(label).addClass('bgn');
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

    /* Change photo placeholder for parent registration in club 360 */
    $('.js-parent-gender').on('change', function () {
        $('[data-src=parent]').find('.js-add-photo').toggleClass('registration__add-photo--man');
    });

    /* Change photo placeholder for scholars registration in club 360 */
    $('.js-scholar-gender').on('change', function () {
        $('[data-src=scholar]').find('.js-add-photo').toggleClass('registration__add-photo--girl');
    });

    if(window.screen.width > 767) {
        $('.js-open-menu').mouseover(function() {
            $(this).find('img:first-of-type').fadeOut(150);
            $('.js-open-menu').find('img:last-of-type').fadeIn(250);
        });

        $('.js-open-menu').mouseleave(function() {
            $(this).find('img:last-of-type').fadeOut(150);
            $('.js-open-menu').find('img:first-of-type').fadeIn(250);
        });
    }

    svg4everybody();
});