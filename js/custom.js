
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    // CAROUSEL LOGIC
    (function carouselLogic($) {
        var currentSlide = 0;
        var slides = $('.slides img');
        var dots = $('.nav-dots .dot a');
        var arrowLeft = $('.arrow-left a');
        var arrowRight = $('.arrow-right a');

        function showSlide(n) {
            if (n >= slides.length) {
                n = 0;
            }
            if (n < 0) {
                n = slides.length - 1;
            }

            slides.each(function (index) {
                $(this).css('display', 'none');
            });
            slides.eq(n).css('display', 'block');

            // 更新导航点的激活状态
            dots.each(function (index) {
                $(this).removeClass('active');
            });
            dots.eq(n).addClass('active');
        }

        function updateDots() {
            dots.each(function (index) {
                $(this).on('click', function () {
                    showSlide(index);
                });
            });
        }

        arrowLeft.on('click', function () {
            showSlide(currentSlide -= 1);
        });

        arrowRight.on('click', function () {
            showSlide(currentSlide += 1);
        });

        showSlide(currentSlide);
        updateDots();
    })(jQuery);

})(window.jQuery);