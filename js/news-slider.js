$(document).ready(function () {
  $('#news-slider8').owlCarousel({
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    autoplay: 3000,
    rewind: true,
    dots: false,
    autoplayHoverPause: true,
  });

  $('#news-slider8').on('mouseleave', function () {
    $('#news-slider8').trigger('stop.owl.autoplay'); //this is main line to fix it
    $('#news-slider8').trigger('play.owl.autoplay');
  });
});
