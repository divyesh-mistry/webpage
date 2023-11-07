(function ($) {
  'use strict';
  var $window = $(window);
  $('#preloader').fadeOut('normall', function () {
    $(this).remove();
  });
  $window.on('scroll', function () {
    var scroll = $window.scrollTop();
    var logoinner = $('.navbar-brand img');
    var logodefault = $('.navbar-brand.logodefault img');
    var logowhite = $('.navbar-brand.logowhite img');
    var logowhitedark = $('.navbar-brand.logowhite-dark img');
    var logo2 = $('.navbar-brand.logo2 img');
    var logo3 = $('.navbar-brand.logo3 img');
    var logo4 = $('.navbar-brand.logo4 h6');
    if (scroll <= 50) {
      $('header').removeClass('scrollHeader').addClass('fixedHeader');
      logoinner.attr('src', 'img/logos/logo-inner.png');
      logodefault.attr('src', 'img/logos/logo.png');
      logowhite.attr('src', 'img/logos/logo-white.png');
      logowhitedark.attr('src', 'img/logos/logo-white.png');
      logo2.attr('src', 'img/logos/logo-2-light.png');
      logo3.attr('src', 'img/logos/logo-2-dark.png');
      logo4.attr('style', 'margin-top: 7%; text-transform: uppercase; font-family: Big John; color: #fff');
    } else {
      $('header').removeClass('fixedHeader').addClass('scrollHeader');
      logoinner.attr('src', 'img/logos/logo.png');
      logodefault.attr('src', 'img/logos/logo.png');
      logowhite.attr('src', 'img/logos/logo-white.png');
      logowhitedark.attr('src', 'img/logos/logo-dark.png');
      logo2.attr('src', 'img/logos/logo-2-dark.png');
      logo3.attr('src', 'img/logos/logo-2-dark.png');
      logo4.attr('style', 'margin-top: 7%; text-transform: uppercase; font-family: Big John; color: #000');
    }
  });
  $window.on('scroll', function () {
    if ($(this).scrollTop() > 500) {
      $('.scroll-to-top').fadeIn(400);
    } else {
      $('.scroll-to-top').fadeOut(400);
    }
  });
  $('.scroll-to-top').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 550 }, 600);
  });
  var pageSection = $('.parallax,.bg-img');
  pageSection.each(function (indx) {
    if ($(this).attr('data-background')) {
      $(this).css(
        'background-image',
        'url(' + $(this).data('background') + ')'
      );
    }
  });
  $('.story-video,.about-video').magnificPopup({
    delegate: '.video',
    type: 'iframe',
  });
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  if ($('.copy-clipboard').length !== 0) {
    new ClipboardJS('.copy-clipboard');
    $('.copy-clipboard').on('click', function () {
      var $this = $(this);
      var originalText = $this.text();
      $this.text('Copied');
      setTimeout(function () {
        $this.text('Copy');
      }, 2000);
    });
  }
  $('.source-modal').magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade',
    removalDelay: 160,
  });
  $('#tab1').click(function () {
    $('#second, #third').fadeOut();
    $('#first').fadeIn(1000);
  });
  $('#tab2').click(function () {
    $('#first, #third').fadeOut();
    $('#second').fadeIn(1000);
  });
  $('#tab3').click(function () {
    $('#second, #first').fadeOut();
    $('#third').fadeIn(1000);
  });
  $window.resize(function (event) {
    setTimeout(function () {
      SetResizeContent();
    }, 500);
    event.preventDefault();
  });
  function fullScreenHeight() {
    var element = $('.full-screen');
    var $minheight = $window.height();
    element.css('min-height', $minheight);
  }
  function ScreenFixedHeight() {
    var $headerHeight = $('header').height();
    var element = $('.screen-height');
    var $screenheight = $window.height() - $headerHeight;
    element.css('height', $screenheight);
  }
  function SetResizeContent() {
    fullScreenHeight();
    ScreenFixedHeight();
  }
  SetResizeContent();
  $(document).ready(function () {
    if ($('#chBar').length !== 0) {
      var chBar = document.getElementById('chBar');
      var chartData = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: [350, 365, 425, 475, 525, 575, 625, 675, 725, 775, 825, 875],
            backgroundColor: [
              'rgba(28, 51, 65,0.8)',
              'rgba(0, 135, 115,0.8)',
              'rgba(107, 185, 131,0.8)',
              'rgba(242, 201, 117,0.8)',
              'rgba(237, 99, 83,0.8)',
              'rgba(242, 190, 84,0.8)',
              'rgba(240, 217, 207,0.8)',
              'rgba(135, 174, 180,0.8)',
              'rgba(21, 62, 92,0.8)',
              'rgba(237, 85, 96,0.8)',
              'rgba(201, 223, 241,0.8)',
              'rgba(240, 217, 207,0.9)',
            ],
          },
        ],
      };
      if (chBar) {
        new Chart(chBar, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              xAxes: [{ barPercentage: 0.5, categoryPercentage: 1 }],
              yAxes: [{ ticks: { beginAtZero: false } }],
            },
            legend: { display: false },
          },
        });
      }
    }
    if ($('#myPieChart').length !== 0) {
      var ctx = document.getElementById('myPieChart').getContext('2d');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green'],
          datasets: [
            {
              data: [10, 15, 20, 30],
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
              ],
            },
          ],
        },
      });
    }
    $('.testmonials-style1').owlCarousel({
      loop: false,
      responsiveClass: true,
      nav: true,
      dots: false,
      margin: 0,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
    });
    $('.testimonial-style2').owlCarousel({
      loop: false,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      margin: 0,
      responsive: { 0: { items: 1 }, 768: { items: 1 }, 1000: { items: 1 } },
    });
    $('.testimonial-style3').owlCarousel({
      loop: false,
      responsiveClass: true,
      nav: true,
      dots: false,
      margin: 0,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
    });
    $('.testimonial-style4').owlCarousel({
      loop: false,
      responsiveClass: true,
      items: 1,
      nav: true,
      dots: true,
      margin: 0,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1, nav: false, dots: false },
        768: { dots: false },
      },
    });
    $('.testmonial-style5').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: true,
      dots: false,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1, margin: 10 },
        768: { items: 2, margin: 15 },
        992: { items: 2, margin: 40 },
      },
    });
    $('.testmonials-style6 .owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 15,
      mouseDrag: false,
      autoplay: true,
      smartSpeed: 500,
    });
    $('.testimonial-style7').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: false,
      margin: 0,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
    });
    $('.testmonials-style8').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: true,
      dots: false,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1, margin: 10 },
        768: { items: 2, margin: 15 },
        992: { items: 2, margin: 40 },
      },
    });
    $('.testimonial-style8').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: false,
      margin: 0,
      autoplay: true,
      thumbs: true,
      thumbsPrerendered: true,
      autoplayTimeout: 5000,
      smartSpeed: 800,
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
    });
    $('.testimonial-style9').owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 500,
      dots: false,
      nav: false,
      margin: 0,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 2 },
        1200: { items: 3 },
      },
    });
    $('.testimonial-style10').owlCarousel({
      loop: false,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 500,
      margin: 0,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        992: { items: 2, margin: 45 },
        1200: { items: 3, margin: 45 },
      },
    });
    $('.testimonial-style11').owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: false,
      dots: true,
      margin: 0,
      responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } },
    });
    $('.testimonial-style12').owlCarousel({
      loop: true,
      responsiveClass: true,
      autoplay: true,
      smartSpeed: 900,
      nav: false,
      dots: true,
      margin: 0,
      responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } },
    });
    $('.featured-products').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 500,
      margin: 0,
      navText: [
        "<i class='ti-arrow-left'></i>Prev",
        "Next<i class='ti-arrow-right'></i>",
      ],
      responsive: {
        0: { items: 1 },
        481: { items: 2, margin: 15 },
        768: { items: 3, margin: 20 },
        992: { items: 4, margin: 30 },
        1200: { items: 4, margin: 30 },
      },
    });
    $('.team .owl-carousel').owlCarousel({
      loop: true,
      margin: 30,
      dots: false,
      nav: false,
      autoplay: true,
      smartSpeed: 500,
      responsiveClass: true,
      responsive: {
        0: { items: 1, margin: 0 },
        700: { items: 2, margin: 15 },
        1000: { items: 4 },
      },
    });
    $('.team-style5').owlCarousel({
      loop: false,
      responsiveClass: true,
      nav: false,
      dots: true,
      margin: 30,
      responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 2 } },
    });
    $('#services-carousel').owlCarousel({
      loop: true,
      responsiveClass: true,
      dots: false,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1, margin: 0 },
        768: { items: 2, margin: 0 },
        992: { items: 3, margin: 0 },
      },
    });
    $('.carousel-style1 .owl-carousel').owlCarousel({
      loop: true,
      dots: false,
      nav: true,
      navText: [
        "<i class='fas fa-angle-left'></i>",
        "<i class='fas fa-angle-right'></i>",
      ],
      autoplay: true,
      autoplayTimeout: 5000,
      responsiveClass: true,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 1, margin: 0 },
        481: { items: 2, margin: 5 },
        500: { items: 2, margin: 20 },
        992: { items: 3, margin: 30 },
        1200: { items: 4, margin: 30 },
      },
    });
    $('.carousel-style2 .owl-carousel').owlCarousel({
      loop: false,
      dots: true,
      nav: false,
      autoplay: true,
      autoplayTimeout: 5000,
      responsiveClass: true,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 1, margin: 0 },
        481: { items: 2, margin: 5 },
        500: { items: 2, margin: 20 },
        992: { items: 3, margin: 30 },
        1200: { items: 3, margin: 30 },
      },
    });
    $('.blog-style-8').owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      autoplay: true,
      autoplayTimeout: 4000,
      responsiveClass: true,
      smartSpeed: 900,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 1, margin: 15 },
        481: { items: 2, margin: 15 },
        500: { items: 2, margin: 20 },
        992: { items: 2, margin: 30 },
      },
    });
    $('#service-grids').owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      autoplay: true,
      autoplayTimeout: 2500,
      responsiveClass: true,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 1, margin: 0 },
        768: { items: 2, margin: 20 },
        992: { items: 3, margin: 30 },
      },
    });
    $('.home-business-slider').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      smartSpeed: 800,
      nav: true,
      dots: false,
      navText: [
        '<span class="fas fa-chevron-left"></span>',
        '<span class="fas fa-chevron-right"></span>',
      ],
      responsive: { 0: { nav: false }, 768: { nav: true } },
    });
    $('#clients').owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      responsiveClass: true,
      autoplayHoverPause: false,
      responsive: {
        0: { items: 2, margin: 20 },
        768: { items: 3, margin: 40 },
        992: { items: 4, margin: 60 },
        1200: { items: 5, margin: 80 },
      },
    });
    $('#project-single').owlCarousel({
      loop: false,
      nav: false,
      responsiveClass: true,
      dots: false,
      responsive: {
        0: { items: 1, margin: 15 },
        600: { items: 2, margin: 15 },
        1000: { items: 3, margin: 15 },
      },
    });
    $('.project-single-two .owl-carousel').owlCarousel({
      loop: false,
      nav: false,
      responsiveClass: true,
      dots: false,
      margin: 15,
      responsive: {
        0: { items: 1, margin: 15 },
        576: { items: 2, margin: 20 },
        768: { items: 3, margin: 20 },
        992: { items: 3, margin: 25 },
        1200: { items: 4, margin: 30 },
      },
    });
    $('.slider-fade .owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 500,
      mouseDrag: false,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
    });
    $('.slider-fade-shop .owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      nav: false,
      dots: true,
      smartSpeed: 500,
      mouseDrag: false,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      responsive: {
        0: { items: 1 },
        1200: {
          dots: false,
          nav: true,
          navText: [
            '<span class="fas fa-chevron-left"></span>',
            '<span class="fas fa-chevron-right"></span>',
          ],
        },
      },
    });
    $('.services-grids').owlCarousel({
      loop: false,
      nav: false,
      responsiveClass: true,
      dots: false,
      autoplay: true,
      smartSpeed: 500,
      mouseDrag: false,
      responsive: {
        0: { items: 1, margin: 15, mouseDrag: true },
        768: { items: 2, margin: 20, mouseDrag: true },
        1200: { items: 3, margin: 25, mouseDrag: false },
      },
    });
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      dots: false,
      margin: 0,
      autoplay: true,
      smartSpeed: 500,
    });
    var owl = $('.slider-fade');
    owl.on('changed.owl.carousel', function (event) {
      var item = event.item.index - 2;
      $('h3').removeClass('animated fadeInUp');
      $('h1').removeClass('animated fadeInUp');
      $('p').removeClass('animated fadeInUp');
      $('.butn').removeClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('h3')
        .addClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('h1')
        .addClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('p')
        .addClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('.butn')
        .addClass('animated fadeInUp');
    });
    var owl = $('.slider-fade-shop');
    owl.on('changed.owl.carousel', function (event) {
      var item = event.item.index - 2;
      $('p').removeClass('animated fadeInUp');
      $('h1').removeClass('animated fadeInUp');
      $('.subheading').removeClass('animated fadeInUp');
      $('.butn').removeClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('.subheading')
        .addClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('h1')
        .addClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('p')
        .addClass('animated fadeInUp');
      $('.owl-item')
        .not('.cloned')
        .eq(item)
        .find('.butn')
        .addClass('animated fadeInUp');
    });
    if ($('#rev_slider_149_1').length !== 0) {
      var tpj = jQuery;
      var revapi149;
      tpj(document).ready(function () {
        if (tpj('#rev_slider_149_1').revolution == undefined) {
          revslider_showDoubleJqueryError('#rev_slider_149_1');
        } else {
          revapi149 = tpj('#rev_slider_149_1')
            .show()
            .revolution({
              sliderType: 'standard',
              jsFileLocation: 'revolution/js/',
              sliderLayout: 'fullwidth',
              dottedOverlay: 'none',
              delay: 9000,
              snow: {
                startSlide: 'first',
                endSlide: 'last',
                maxNum: '400',
                minSize: '0.2',
                maxSize: '6',
                minOpacity: '0.3',
                maxOpacity: '1',
                minSpeed: '30',
                maxSpeed: '100',
                minSinus: '1',
                maxSinus: '100',
              },
              navigation: {
                keyboardNavigation: 'off',
                keyboard_direction: 'vertical',
                mouseScrollNavigation: 'off',
                mouseScrollReverse: 'default',
                onHoverStop: 'off',
                touch: {
                  touchenabled: 'on',
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: 'horizontal',
                  drag_block_vertical: false,
                },
                arrows: {
                  style: 'uranus',
                  enable: true,
                  hide_onmobile: false,
                  hide_onleave: false,
                  tmp: '',
                  left: {
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 10,
                    v_offset: 0,
                  },
                  right: {
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 10,
                    v_offset: 0,
                  },
                },
              },
              responsiveLevels: [1240, 1024, 778, 480],
              visibilityLevels: [1240, 1024, 778, 480],
              gridwidth: [1240, 1024, 778, 480],
              gridheight: [868, 768, 960, 720],
              lazyType: 'none',
              scrolleffect: {
                blur: 'on',
                maxblur: '20',
                on_slidebg: 'on',
                direction: 'top',
                multiplicator: '2',
                multiplicator_layers: '2',
                tilt: '10',
                disable_on_mobile: 'off',
              },
              parallax: {
                type: 'scroll',
                origo: 'slidercenter',
                speed: 400,
                levels: [
                  5,
                  10,
                  15,
                  20,
                  25,
                  30,
                  35,
                  40,
                  45,
                  46,
                  47,
                  48,
                  49,
                  50,
                  51,
                  55,
                ],
              },
              shadow: 0,
              spinner: 'spinner3',
              stopLoop: 'off',
              stopAfterLoops: -1,
              stopAtSlide: -1,
              shuffle: 'off',
              autoHeight: 'off',
              fullScreenAutoWidth: 'off',
              fullScreenAlignForce: 'off',
              fullScreenOffsetContainer: '',
              fullScreenOffset: '60px',
              hideThumbsOnMobile: 'off',
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: {
                simplifyAll: 'off',
                nextSlideOnWindowFocus: 'off',
                disableFocusListener: false,
              },
            });
        }
      });
    }
    if ($('#rev_slider_2').length !== 0) {
      var tpj = jQuery;
      var revapi2;
      tpj(document).ready(function () {
        if (tpj('#rev_slider_2').revolution == undefined) {
          revslider_showDoubleJqueryError('#rev_slider_2');
        } else {
          revapi2 = tpj('#rev_slider_2')
            .show()
            .revolution({
              sliderType: 'standard',
              sliderLayout: 'fullwidth',
              dottedOverlay: 'none',
              delay: 9000,
              spinner: 'spinner4',
              navigation: {
                keyboardNavigation: 'off',
                keyboard_direction: 'horizontal',
                mouseScrollNavigation: 'off',
                onHoverStop: 'off',
                touch: {
                  touchenabled: 'on',
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: 'horizontal',
                  drag_block_vertical: false,
                },
                arrows: {
                  enable: true,
                  style: 'metis',
                  tmp: '',
                  rtl: false,
                  hide_onleave: true,
                  hide_onmobile: true,
                  hide_under: 0,
                  hide_over: 9999,
                  hide_delay: 200,
                  hide_delay_mobile: 1200,
                  left: {
                    container: 'slider',
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 20,
                    v_offset: 0,
                  },
                  right: {
                    container: 'slider',
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 20,
                    v_offset: 0,
                  },
                },
                bullets: { enable: false },
              },
              responsiveLevels: [1240, 1024, 767, 480],
              gridwidth: [1170, 1170, 767, 480],
              gridheight: [700, 700, 600, 600],
              lazyType: 'none',
              shadow: 0,
              shuffle: 'off',
              autoHeight: 'off',
            });
        }
      });
    }
    if ($('#rev_slider_1014_1').length !== 0) {
      var tpj = jQuery;
      var revapi1014;
      tpj(document).ready(function () {
        if (tpj('#rev_slider_1014_1').revolution == undefined) {
          revslider_showDoubleJqueryError('#rev_slider_1014_1');
        } else {
          revapi1014 = tpj('#rev_slider_1014_1')
            .show()
            .revolution({
              sliderType: 'standard',
              jsFileLocation: 'revolution/js/',
              sliderLayout: 'fullscreen',
              dottedOverlay: 'none',
              delay: 9000,
              navigation: {
                keyboardNavigation: 'off',
                keyboard_direction: 'horizontal',
                mouseScrollNavigation: 'off',
                mouseScrollReverse: 'default',
                onHoverStop: 'off',
                touch: {
                  touchenabled: 'on',
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: 'horizontal',
                  drag_block_vertical: false,
                },
                arrows: {
                  style: 'uranus',
                  enable: false,
                  hide_onmobile: true,
                  hide_under: 768,
                  hide_onleave: false,
                  tmp: '',
                  left: {
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 20,
                    v_offset: 0,
                  },
                  right: {
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 20,
                    v_offset: 0,
                  },
                },
              },
              responsiveLevels: [1240, 1024, 778, 480],
              visibilityLevels: [1240, 1024, 778, 480],
              gridwidth: [1240, 1024, 778, 480],
              gridheight: [868, 768, 960, 600],
              lazyType: 'none',
              shadow: 0,
              spinner: 'off',
              stopLoop: 'on',
              stopAfterLoops: 0,
              stopAtSlide: 1,
              shuffle: 'off',
              autoHeight: 'off',
              fullScreenAutoWidth: 'off',
              fullScreenAlignForce: 'off',
              fullScreenOffsetContainer: '',
              fullScreenOffset: '0',
              disableProgressBar: 'on',
              hideThumbsOnMobile: 'off',
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: {
                simplifyAll: 'off',
                nextSlideOnWindowFocus: 'off',
                disableFocusListener: false,
              },
            });
        }
        RsTypewriterAddOn(tpj, revapi1014);
      });
    }
    if ($('#rev_slider_3').length !== 0) {
      var tpj = jQuery;
      var revapi4;
      tpj(document).ready(function () {
        if (tpj('#rev_slider_3').revolution == undefined) {
          revslider_showDoubleJqueryError('#rev_slider_3');
        } else {
          revapi4 = tpj('#rev_slider_3')
            .show()
            .revolution({
              sliderLayout: 'fullscreen',
              delay: 12000,
              responsiveLevels: [4096, 1024, 778, 420],
              gridwidth: [1170, 1024, 778, 410],
              gridheight: 600,
              hideThumbs: 10,
              fullScreenAutoWidth: 'on',
              fullScreenOffsetContainer: '.rev-offset',
              navigation: {
                onHoverStop: 'off',
                touch: {
                  touchenabled: 'on',
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: 'horizontal',
                  drag_block_vertical: false,
                },
                arrows: {
                  enable: true,
                  style: 'hermes',
                  tmp:
                    '<div class="tp-arr-allwrapper"> <div class="tp-arr-imgholder"></div> <div class="tp-arr-titleholder">{{title}}</div> </div>',
                  left: {
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 0,
                    v_offset: 0,
                  },
                  right: {
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 0,
                    v_offset: 0,
                  },
                },
                bullets: {
                  style: '',
                  enable: false,
                  hide_onmobile: false,
                  hide_onleave: true,
                  hide_delay: 200,
                  hide_delay_mobile: 1200,
                  hide_under: 0,
                  hide_over: 9999,
                  direction: 'horizontal',
                  space: 12,
                  h_align: 'center',
                  v_align: 'bottom',
                  h_offset: 0,
                  v_offset: 30,
                  tmp: '',
                },
              },
              parallax: {
                type: 'scroll',
                levels: [
                  5,
                  10,
                  15,
                  20,
                  25,
                  30,
                  35,
                  40,
                  45,
                  50,
                  55,
                  60,
                  65,
                  70,
                  75,
                  80,
                  85,
                ],
                origo: 'enterpoint',
                speed: 400,
                bgparallax: 'on',
                disable_onmobile: 'on',
              },
              spinner: 'spinner4',
            });
        }
      });
    }
    if ($('#rev_slider_151_1').length !== 0) {
      var tpj = jQuery;
      var revapi151;
      tpj(document).ready(function () {
        if (tpj('#rev_slider_151_1').revolution == undefined) {
          revslider_showDoubleJqueryError('#rev_slider_151_1');
        } else {
          revapi151 = tpj('#rev_slider_151_1')
            .show()
            .revolution({
              sliderType: 'standard',
              jsFileLocation: 'revolution/js/',
              sliderLayout: 'fullscreen',
              dottedOverlay: 'none',
              delay: 9000,
              navigation: {
                keyboardNavigation: 'off',
                keyboard_direction: 'vertical',
                mouseScrollNavigation: 'off',
                mouseScrollReverse: 'default',
                onHoverStop: 'off',
                touch: {
                  touchenabled: 'on',
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: 'horizontal',
                  drag_block_vertical: false,
                },
                arrows: {
                  style: 'uranus',
                  enable: true,
                  hide_onmobile: false,
                  hide_over: 479,
                  hide_onleave: false,
                  tmp: '',
                  left: {
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 0,
                    v_offset: 0,
                  },
                  right: {
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 0,
                    v_offset: 0,
                  },
                },
              },
              responsiveLevels: [1240, 1024, 778, 480],
              visibilityLevels: [1240, 1024, 778, 480],
              gridwidth: [1240, 1024, 778, 480],
              gridheight: [868, 768, 960, 720],
              lazyType: 'none',
              scrolleffect: {
                blur: 'on',
                maxblur: '20',
                on_slidebg: 'on',
                direction: 'top',
                multiplicator: '2',
                multiplicator_layers: '2',
                tilt: '10',
                disable_on_mobile: 'off',
              },
              parallax: {
                type: 'scroll',
                origo: 'slidercenter',
                speed: 400,
                levels: [
                  5,
                  10,
                  15,
                  20,
                  25,
                  30,
                  35,
                  40,
                  45,
                  46,
                  47,
                  48,
                  49,
                  50,
                  51,
                  55,
                ],
              },
              shadow: 0,
              spinner: 'spinner3',
              stopLoop: 'off',
              stopAfterLoops: -1,
              stopAtSlide: -1,
              shuffle: 'off',
              autoHeight: 'off',
              fullScreenAutoWidth: 'off',
              fullScreenAlignForce: 'off',
              fullScreenOffsetContainer: '',
              fullScreenOffset: '0',
              hideThumbsOnMobile: 'off',
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: {
                simplifyAll: 'off',
                nextSlideOnWindowFocus: 'off',
                disableFocusListener: false,
              },
            });
        }
      });
    }
    if ($('#rev_slider_1174_1').length !== 0) {
      var tpj = jQuery;
      var revapi1174;
      tpj(document).ready(function () {
        if (tpj('#rev_slider_1174_1').revolution == undefined) {
          revslider_showDoubleJqueryError('#rev_slider_1174_1');
        } else {
          revapi1174 = tpj('#rev_slider_1174_1')
            .show()
            .revolution({
              sliderType: 'hero',
              jsFileLocation: 'revolution/js/',
              sliderLayout: 'fullscreen',
              dottedOverlay: 'none',
              delay: 9000,
              navigation: {},
              responsiveLevels: [1240, 1024, 778, 480],
              visibilityLevels: [1240, 1024, 778, 480],
              gridwidth: [1240, 1024, 778, 480],
              gridheight: [868, 768, 960, 720],
              lazyType: 'none',
              parallax: {
                type: 'scroll',
                origo: 'slidercenter',
                speed: 400,
                levels: [
                  10,
                  15,
                  20,
                  25,
                  30,
                  35,
                  40,
                  -10,
                  -15,
                  -20,
                  -25,
                  -30,
                  -35,
                  -40,
                  -45,
                  55,
                ],
                type: 'scroll',
              },
              shadow: 0,
              spinner: 'off',
              autoHeight: 'off',
              fullScreenAutoWidth: 'off',
              fullScreenAlignForce: 'off',
              fullScreenOffsetContainer: '',
              fullScreenOffset: '0',
              disableProgressBar: 'on',
              hideThumbsOnMobile: 'off',
              hideSliderAtLimit: 0,
              hideCaptionAtLimit: 0,
              hideAllCaptionAtLilmit: 0,
              debugMode: false,
              fallbacks: { simplifyAll: 'off', disableFocusListener: false },
            });
        }
      });
    }
    if ($('.horizontaltab').length !== 0) {
      $('.horizontaltab').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'hor_1',
        activate: function (event) {
          var $tab = $(this);
          var $info = $('#nested-tabInfo');
          var $name = $('span', $info);
          $name.text($tab.text());
          $info.show();
        },
      });
    }
    if ($('.childverticaltab').length !== 0) {
      $('.childverticaltab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1',
        activetab_bg: '#fff',
        inactive_bg: '#F5F5F5',
        active_border_color: '#c1c1c1',
        active_content_border_color: '#c1c1c1',
      });
    }
    if ($('.verticaltab').length !== 0) {
      $('.verticaltab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true,
        closed: 'accordion',
        tabidentify: 'hor_1',
        activate: function (event) {
          var $tab = $(this);
          var $info = $('#nested-tabInfo2');
          var $name = $('span', $info);
          $name.text($tab.text());
          $info.show();
        },
      });
    }
    $('.countup').counterUp({ delay: 25, time: 2000 });
    if ($('.countdown').length !== 0) {
      var tpj = jQuery;
      var countdown;
      tpj(document).ready(function () {
        if (tpj('.countdown').countdown == undefined) {
          countdown('.countdown');
        } else {
          countdown = tpj('.countdown')
            .show()
            .countdown({ date: '01 Jan 2022 00:01:00', format: 'on' });
        }
      });
    }
  });
  $window.on('load', function () {
    $('.single-img').magnificPopup({ delegate: '.popimg', type: 'image' });
    $('.gallery').magnificPopup({
      delegate: '.popimg',
      type: 'image',
      gallery: { enabled: true },
    });
    var $gallery = $('.gallery').isotope({});
    $('.filtering').on('click', 'span', function () {
      var filterValue = $(this).attr('data-filter');
      $gallery.isotope({ filter: filterValue });
    });
    $('.filtering').on('click', 'span', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
    $window.stellar();
  });
})(jQuery);
