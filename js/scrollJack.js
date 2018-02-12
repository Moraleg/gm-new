
// Scroll Jack
(($) => {

   /*=========================================*\
  		Variables
  	\*=========================================*/

	let delta = 0; //distance scrolled/dragged in slide
	let currentSlideIndex = 0; // the current slide
   const  scrollThreshold = 45; // px to scroll before engaging
   const dragThreshold = 0.15; // "percentage" to drag before engaging
	const slides = $('.slide');
   const slideNavSelector = $('.projects');
	const navSlides = $('.nav-slide');
	const numSlides = slides.length - 1; // total number of slides


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


      //loop over slides and add the correct active classes
		slides.each(function(i, slide) {
			$(slide).toggleClass('active', (i >= currentSlideIndex));
		});


      //update the navigation
      updateSlideNav(currentSlideIndex);

      //return the current slide
		return currentSlideIndex;

	}




	const prevSlide = () => {

		currentSlideIndex--;

		if (currentSlideIndex < 0) {
			currentSlideIndex = 0;
		}

		showSlide(currentSlideIndex);

      // return the current slide
	   return currentSlideIndex;
	}

	const nextSlide = () => {

		currentSlideIndex++;

		if (currentSlideIndex > numSlides) {
			currentSlideIndex = numSlides;
		}

		showSlide(currentSlideIndex);

      //return the current slide
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
         introChange();
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
      console.log(currentSlideIndex);

      // When link clicked, find slide it points to
      const newslide = parseInt($(this).data('slide'));

      // find how far it is from current slide
      const diff = newslide - currentSlideIndex - 1;
      showSlide(diff); // show that slide

      e.preventDefault();
	});


   // mobile

    let dragStart = null;	 // used to determine touch / drag distance
    let percentage = 0;
    let target,
    previousTarget;

   const touchStart = (e) => {

   	if (dragStart !== null) { return; }
   	if (e.originalEvent.touches) {
   		event = e.originalEvent.touches[0];
   	}

   	// where in the viewport was touched
   	dragStart = event.clientY;

   	// make sure we're dealing with a slide
   	target = slides.eq(currentSlideIndex)[0];
      console.log(target);

   	previousTarget = slides.eq(currentSlideIndex-1)[0];
   };

   const touchMove = (e) => {

   	if (dragStart === null) { return; }

   	if (e.originalEvent.touches) {
   		event = e.originalEvent.touches[0];
   	}

   	delta = dragStart - event.clientY;

   	percentage = delta;

      if (e.orgiginalEvent.detail < 0 || e.originalEvent.touches > 0) {

         percentage--;

         if (Math.abs(percentage) >= dragThreshold) {
            prevSlide();
         }
      } else  {
         percentage++;
         if(percentage >= dragThreshold) {
            nextSlide();
         }
   	}

   	// Don't drag element. This is important.
   	return false;
   };

   const touchEnd = () => {

   	dragStart = null;

   	if (percentage >= dragThreshold) {
   		nextSlide();
   	}
   	else if ( Math.abs(percentage) >= dragThreshold ) {
   		prevSlide();
   	} else {
   		// show current slide i.e. snap back
   		showSlide();
   	}

   	percentage = 0;

   };

   $('#projects').on({
   	'touchstart': touchStart,
   	'touchmove': touchMove,
   	'touchend': touchEnd
   });






})(jQuery); //end window onload
