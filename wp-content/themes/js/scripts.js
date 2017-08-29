// ------------------------------------------------------------------------
// Check if element is in ViewPort
// ------------------------------------------------------------------------
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
    // ------------------------------------------------------------------------
    // Preloader
    // ------------------------------------------------------------------------
    $(window).load(function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });
    $(document).ready(function() {
      $("#customizer .options").click(function() {
        $("#customizer").toggleClass('active');
      });
      $("#customizer #colors a").click(function() {
        var colorClass = $(this).attr('id');
        if (colorClass == 'blue') {
          $('.css-color').attr('href', '#');
        }
        $('.css-color').attr('href', '/wp-content/themes/keysoft/css/colors/' + colorClass + '.css');
      });
        // ------------------------------------------------------------------------
        // Custom Search Field
        // ------------------------------------------------------------------------
        $("#s").each(function(index, elem) {
            var eId = $(elem).attr("id");
            var label = null;
            if (eId && (label = $(elem).parents("form").find("label[for=" + eId + "]")).length == 1) {
                $(elem).attr("placeholder", 'Search');
                $(label).remove();
            }
        });
        $("#searchsubmit").val('');
        // ------------------------------------------------------------------------
        // Contact Form Buttons
        // ------------------------------------------------------------------------
        $(document).on("click", ".subscribe .wpcf7-not-valid-tip,.subscribe .wpcf7-mail-sent-ok, .subscribe-form header .wpcf7-response-output", function() {
            $(this).fadeOut();
        });
        // ------------------------------------------------------------------------
        // Main Menu One Page Links
        // ------------------------------------------------------------------------
        $('.navbar-nav li.one-page-link > a:first-child, .wpb_wrapper .menu li.one-page-link > a:first-child').each(function() {
            var href = $(this).attr("href");
            link = href.replace(/\/$/, '');
            if ($("body").hasClass("home")) {
                anchor = link.substr(link.lastIndexOf('/') + 1);
                $(this).attr("href", '#' + anchor);
            } else {
                if (!$(this).hasClass("first")) {
                    var pos = link.lastIndexOf('/');
                    link = link.substring(0, pos) + '#' + link.substring(pos + 1)
                    $(this).attr("href", link);
                }
            }
        });

        $( "<span class='mobile-dropdown'></span>" ).appendTo( $( "#menu-main-menu .menu-item-has-children" ) );

        $("#menu-main-menu .dropdown a").click(function() {
        $(this).closest(".menu-item-has-children").toggleClass('mobile-visible');
        
        });


        // ------------------------------------------------------------------------
        // Main Smooth Scroll and Scroll Spy
        // ------------------------------------------------------------------------

        $(function() {
            $('.navbar-nav li a, .wpb_wrapper .menu li a').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - 64
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });
        $('body').scrollspy({
            offset: 64,
            target: '.navbar-fixed-top'
        })
    });

    // ------------------------------------------------------------------------
    // Classie Script
    // ------------------------------------------------------------------------
    (function(window) {
        'use strict';
        function classReg(className) {
            return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }
        var hasClass, addClass, removeClass;
        if ('classList' in document.documentElement) {
            hasClass = function(elem, c) {
                return elem.classList.contains(c);
            };
            addClass = function(elem, c) {
                elem.classList.add(c);
            };
            removeClass = function(elem, c) {
                elem.classList.remove(c);
            };
        } else {
            hasClass = function(elem, c) {
                return classReg(c).test(elem.className);
            };
            addClass = function(elem, c) {
                if (!hasClass(elem, c)) {
                    elem.className = elem.className + ' ' + c;
                }
            };
            removeClass = function(elem, c) {
                elem.className = elem.className.replace(classReg(c), ' ');
            };
        }
        function toggleClass(elem, c) {
            var fn = hasClass(elem, c) ? removeClass : addClass;
            fn(elem, c);
        }
        var classie = {
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            toggleClass: toggleClass,
            has: hasClass,
            add: addClass,
            remove: removeClass,
            toggle: toggleClass
        };
        if (typeof define === 'function' && define.amd) {
            define(classie);
        } else {
            window.classie = classie;
        }

    })(window);
    // ------------------------------------------------------------------------
    // Animated Header
    // ------------------------------------------------------------------------

    var cbpAnimatedHeader = (function() {
        var docElem = document.documentElement,
            header = document.querySelector('.navbar-default'),
            didScroll = false,
            changeHeaderOn = 50;
        function init() {
            window.addEventListener('scroll', function(event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 100);
                }
            }, false);
            window.addEventListener('load', function(event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 100);
                }
            }, false);
        }
        function scrollPage() {
            var sy = scrollY();
            if (sy >= changeHeaderOn) {
                classie.add(header, 'navbar-shrink');
            } else {
                classie.remove(header, 'navbar-shrink');
            }
            didScroll = false;
        }
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
        init();
    })();
})(jQuery);
