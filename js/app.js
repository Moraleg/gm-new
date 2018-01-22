// Image Slide Down

$(document).ready(function(){
   $('.slideDown').slideDown(500, "swing");
});


(function($) {


	var delta = 0;
	var currentSlideIndex = 0;
	var scrollThreshold = 45;
	var slides = $('.slide');
	var navSlides = $('.nav-slide');
	var numSlides = slides.length;
	// var p0 = $('#project-0');
	// var p1 = $('.project-1');
	// var p2 = $('#project-2');


	function elementScroll (e) {

		// --- Scrolling up ---
		if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {

			delta--;

			if ( Math.abs(delta) >= scrollThreshold) {
				prevSlide();
			}

		} else { // --- Scrolling down ---

			delta++;

			if (delta >= scrollThreshold) {
				nextSlide();
			}
		}

		// Prevent page from scrolling
		return false;
	}


	function showSlide() {

		// reset
		delta = 0;

		slides.each(function(i, slide, slideNav) {
			$(slide).toggleClass('active', (i >= currentSlideIndex));
		});

		navSlides.each(function(i, slide, slideNav) {
			$(slide).toggleClass('active', (i == currentSlideIndex));
		});
	}


	function prevSlide() {

		currentSlideIndex--;

		if (currentSlideIndex < 0) {
			currentSlideIndex = 0;
		}

		showSlide();
	}

	function nextSlide() {

		currentSlideIndex++;

		if (currentSlideIndex > numSlides) {
			currentSlideIndex = numSlides;
		}

		showSlide();
	}

	// On Mouse Scroll
	$(window).on({
		'DOMMouseScroll mousewheel': elementScroll
	});


	// On Arrow Keys
	$(document).keyup(function(e) {
		// Left or back arrows
		if ((e.which === 37) ||  (e.which === 38)){
			prevSlide();
		}
		// Down or right
		if ((e.which === 39) ||  (e.which === 40)) {
			nextSlide();
		}
	});

	// On Nav Control
	$('.nav-slide').on('click', function(e) {
		e.preventDefault();
		// get current slide
		var current = $('.active').data('slide'),
		// get button data-slide
		next = $(this).data('slide');

		$('.nav-slide').removeClass('active');
		$(this).addClass('active');

		if (current >= next) {
			prevSlide();
		} else {
			nextSlide();
		}
	});




})(jQuery); //end window onload
