/* ------------------------------------------------------------------------
  CHECK IF ELEMENT IS IN VIEWPORT
 ------------------------------------------------------------------------*/

    (function($) {
        $.belowthefold = function(element, settings) {
            var fold = $(window).height() + $(window).scrollTop();
            return fold <= $(element).offset().top - settings.threshold;
        };
        $.abovethetop = function(element, settings) {
            var top = $(window).scrollTop();
            return top >= $(element).offset().top + $(element).height() - settings.threshold;
        };
        $.rightofscreen = function(element, settings) {
            var fold = $(window).width() + $(window).scrollLeft();
            return fold <= $(element).offset().left - settings.threshold;
        };
        $.leftofscreen = function(element, settings) {
            var left = $(window).scrollLeft();
            return left >= $(element).offset().left + $(element).width() - settings.threshold;
        };
        $.inviewport = function(element, settings) {
            return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
        };
        $.extend($.expr[':'], {
            "below-the-fold": function(a, i, m) {
                return $.belowthefold(a, {
                    threshold: 0
                });
            },
            "above-the-top": function(a, i, m) {
                return $.abovethetop(a, {
                    threshold: 0
                });
            },
            "left-of-screen": function(a, i, m) {
                return $.leftofscreen(a, {
                    threshold: 0
                });
            },
            "right-of-screen": function(a, i, m) {
                return $.rightofscreen(a, {
                    threshold: 0
                });
            },
            "in-viewport": function(a, i, m) {
                return $.inviewport(a, {
                    threshold: 0
                });
            }
        });
    })(jQuery);




jQuery(document).ready(function($) {

/* ------------------------------------------------------------------------
  MAP CONTAINER
 ------------------------------------------------------------------------*/

 (function($) {
  $('.contact-map-container').prependTo('#contact');
 })(jQuery);



/* ------------------------------------------------------------------------
    //AUTO PLAY YOUTUBE VIDEO ELEMENT
 ------------------------------------------------------------------------*/

    function autoPlayYouTubeModal() {
      var trigger = $("body").find('[data-toggle="modal"]');
      trigger.click(function() {
        var theModal = $(this).data("target"),
        videoSRC = $(this).attr("data-theVideo"),
          videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function() {
          $(theModal + ' iframe').attr('src', videoSRC);
        });
        $('.modal').click(function() {
          $(theModal + ' iframe').attr('src', videoSRC);
        });
      });
    }
    autoPlayYouTubeModal();

/* ------------------------------------------------------------------------
  TESTIMONIALS ELEMENT
 ------------------------------------------------------------------------*/

if ( $( ".slider.testimonials" ).length ) {
    $(".slider.testimonials").owlCarousel({
      navigation: true,
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true
    });
    $( ".tt-image" ).appendTo( ".tt-images" );
}

/* ------------------------------------------------------------------------
  TABS ELEMENT
 ------------------------------------------------------------------------*/

$('.features-tabs li.tab').appendTo('.features-tabs .tabs');
var tabsnumber = $('.tabs > li.tab').length;
$('.tabs li.tab').css('width',100/tabsnumber + '%');

if ( $( ".features-tabs" ).length ) {
  $('.features-tabs').easytabs({
    animationSpeed: 'normal',
    updateHash: false
  });
}


/* ------------------------------------------------------------------------
  CLIENTS ELEMENT
 ------------------------------------------------------------------------*/


if ( $( ".slider.clients" ).length ) {
    $(".slider.clients").owlCarousel({
      navigation: true,
      pagination: false,
      autoPlay: 5000,
      items: 3,
    });
}


if ( $( ".slider.publisher" ).length ) {
    $(".slider.publisher").owlCarousel({
      navigation: true,
      pagination: false,
      autoPlay: 5000,
      items: 4,
    });
}

});
