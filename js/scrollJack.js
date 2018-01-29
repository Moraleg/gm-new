
// Scroll Jack
(($) => {

   /*=========================================*\
  			  Variables
  	\*=========================================*/

	let delta = 0;
	let currentSlideIndex = 0;
   const  scrollThreshold = 45;
   const dragThreshold = 0.15; // "percentage" to drag before engaging
	const slides = $('.slide');
   const slideNavSelector = $('.projects');
	const navSlides = $('.nav-slide');
   const activeSlideClass = ('active');
	const numSlides = slides.length - 1;


   /*=========================================*\
      Scroll - DOMScroll and
      mousewheel events


   \*=========================================*/

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

   // On Mouse Scroll
   $(window).on({
      'DOMMouseScroll mousewheel': elementScroll
   });


   /*=========================================*\
         Slide control functions

         Used to update slide via any nav menthod

           -showSlide
           -prevSlide
           -nextSlide
           -updateSlideNav
   \*=========================================*/


	const showSlide = () => {

		// reset
		delta = 0;

		slides.each(function(i, slide, slideNav) {
			$(slide).toggleClass('active', (i >= currentSlideIndex));
		});


      //update the navigation
      updateSlideNav(currentSlideIndex);

      //return the current panel
		return currentSlideIndex;

	}




	const prevSlide = () => {

		currentSlideIndex--;

		if (currentSlideIndex < 0) {
			currentSlideIndex = 0;
		}

		showSlide(currentSlideIndex);

      // return the current panel
	   return currentSlideIndex;
	}

	const nextSlide = () => {

		currentSlideIndex++;

		if (currentSlideIndex > numSlides) {
			currentSlideIndex = numSlides;
		}

		showSlide(currentSlideIndex);

      //return the current panel
      return currentSlideIndex;
	}

   const updateSlideNav = function(currentSlideIndex) {
      navSlides.removeClass('active');
      navSlides.eq(currentSlideIndex).addClass('active');
   };


   /*=========================================*\
   	Alternate slide navigation

   		- arrow keys
   		- nav click event
   \*=========================================*/


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

	// On Nav Control - Nav Click event
	$('.nav-slide').on('click', function(e) {

         //Get current slide
         currentSlideIndex = $(this).data('slide');
         // console.log(currentSlideIndex);

         // When link clicked, find slide it points to
         const newslide = parseInt($(this).data('slide'));
         // console.log(newslide);

         // find how far it is from current slide
         const diff = newslide - currentSlideIndex - 1;
         showSlide(diff); // show that slide

         e.preventDefault();
	});









})(jQuery); //end window onload
