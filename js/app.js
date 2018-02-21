// Image Slide Down
$(document).ready(() => {
   $('.slideDown').slideDown(500, "swing");
});


jQuery(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 768) {
      $('.bio').addClass('vertical-sufi one');
   } else if (ww >= 768) {
      $('.bio').addClass('slide-up-fade-in three');
      $('.bio').removeClass('vertical-sufi one');
    }
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
});
