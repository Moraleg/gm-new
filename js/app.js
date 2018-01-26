// Image Slide Down

$(document).ready(() => {
   $('.slideDown').slideDown(500, "swing");

});

// Scroll Jack

(($) => {


	let delta = 0;
	let currentSlideIndex = 0;
   const  scrollThreshold = 45;
	const slides = $('.slide');
	const navSlides = $('.nav-slide');
	const numSlides = slides.length - 1;



	const elementScroll = (e) => {

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


	const showSlide = () => {

		// reset
		delta = 0;

		slides.each(function(i, slide, slideNav) {
			$(slide).toggleClass('active', (i >= currentSlideIndex));
		});

		navSlides.each(function(i, slide, slideNav) {
			$(slide).toggleClass('active', (i == currentSlideIndex));
		});
	}


	const prevSlide = () => {

		currentSlideIndex--;

		if (currentSlideIndex < 0) {
			currentSlideIndex = 0;
		}

		showSlide();
	}

	const nextSlide = () => {

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
	$(document).keyup((e) => {
		// Left or back arrows
		if ((e.which === 37) ||  (e.which === 38)){
			prevSlide();
		}
		// Down or right
		if ((e.which === 39) ||  (e.which === 40)) {
			nextSlide();
		}
	});

	// On Nav Control - need to make this specific to page
	$('.nav-slide').on('click', function(e) {
		e.preventDefault();
		// get current slide
		const current = $('.active').data('slide'),
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
