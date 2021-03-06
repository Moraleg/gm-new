// Scroll Jack

$(function(){


	/*=========================================*\
	Variables
	\*=========================================*/

	var delta = 0; //distance scrolled/dragged in slide
	var currentSlideIndex = 0; // the current slide
	var  scrollThreshold = 45; // px to scroll before engaging
	var dragThreshold = 0.15; // "percentage" to drag before engaging
	var slides = $('.slide');
	var navSlides = $('.nav-slide');
	var numSlides = slides.length - 1; // total number of slides
	var intro = $('.intro-container p'); //change nav text per section



	/*=========================================*\
		Scroll - DOMScroll and
		mousewheel events
	\*=========================================*/

	var elementScroll = function(e){

		introChange();

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

	/*=========================================*\
		Slide control functions

		Used to update slide via any nav menthod
		-showSlide
		-prevSlide
		-nextSlide
		-updateSlideNav
	\*=========================================*/

	var showSlide = function() {

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


	var prevSlide = function() {

		currentSlideIndex--;

		if (currentSlideIndex < 0) {
			currentSlideIndex = 0;
		}

		showSlide(currentSlideIndex);

		// return the current slide
		return currentSlideIndex;
	}

	var nextSlide = function() {

		currentSlideIndex++;

		if (currentSlideIndex > numSlides) {
			currentSlideIndex = numSlides;
		}

		showSlide(currentSlideIndex);

		//return the current slide
		return currentSlideIndex;
	}

	// On Mouse Scroll
	$(window).on({'DOMMouseScroll mousewheel': elementScroll});

	var updateSlideNav = function(currentSlideIndex) {
		navSlides.removeClass('active');
		navSlides.eq(currentSlideIndex).addClass('active');
	};


	/*=========================================*\
		Alternate slide navigation
		- arrow keys
		- nav click event
	\*=========================================*/

	// On Arrow Keys
	$(document).keyup(function(e) {
		// Left or back arrows
		if ((e.which === 37) ||  (e.which === 38)){
			prevSlide();
			introChange();
			console.log(currentSlideIndex);
		}
		// Down or right
		if ((e.which === 39) ||  (e.which === 40)) {
			nextSlide();
			introChange();
		}
	});

	// On Nav Control - Nav Click event
	$('.nav-slide').on('click', function(e) {

		//Get current slide
		currentSlideIndex = $(this).data('slide');
		// console.log(currentSlideIndex);

		// When link clicked, find slide it points to
		var newslide = parseInt($(this).data('slide'));

		// find how far it is from current slide
		var diff = newslide - currentSlideIndex - 1;
		showSlide(diff); // show that slide

		introChange();

		e.preventDefault();
	});


	//introchange function
	var introChange = function() {
		for( var i = 0; i < intro.length; i++) {

			if(currentSlideIndex === 1) {
				intro[i].innerHTML = 'PROJ<br>ECT<br>001';
			} else if (currentSlideIndex === 2) {
				intro[i].innerHTML = 'PROJ<br>ECT<br>002';
			} else if (currentSlideIndex === 3) {
				intro[i].innerHTML = 'PROJ<br>ECT<br>003';
			} else if (currentSlideIndex === 4) {
				intro[i].innerHTML = 'PROJ<br>ECT<br>004';
			} else if (currentSlideIndex === 5) {
				intro[i].innerHTML = 'PROJ<br>ECT<br>005';
			} else {
				intro[i].innerHTML = 'INT<br>RO';
			}

		}
	};// end introchange



	// mobile
	var dragStart = null;	 // used to determine touch / drag distance
	var percentage = 0;
	var target,
	previousTarget;

	var touchStart = function(event) {

		if (dragStart !== null) { return; }
		if (event.originalEvent.touches) {
			event = event.originalEvent.touches[0];
		}

		// where in the viewport was touched
		dragStart = event.clientY;

		// make sure we're dealing with a slide
		target = slides.eq(currentSlideIndex)[0];

		previousTarget = slides.eq(currentSlideIndex-1)[0];

		introChange();
	};

	var touchMove = function(event) {

		if (dragStart === null) { return; }

		if (event.originalEvent.touches) {
			event = event.originalEvent.touches[0];
		}

		delta = dragStart - event.clientY;
		percentage = delta;
		console.log('percentage: ', percentage);
		
		// Going down/next. Animate the height of the target element.
		if (percentage > 0) {
			target.style.height = (100 - (percentage*100)) + '%';
			if(previousTarget) {
				previousTarget.style.height = ''; //reset
			}
		} else if (previousTarget) { // Going up/prev. Animate the height of the _previous_ element.
			previousTarget.style.height = (- percentage*100) + '%';
			target.style.height = ''; //reset
		}

		// if (event.originalEvent.detail < 0 || event.originalEvent.touches > 0) {

		// 	percentage--;

		// 	if (Math.abs(percentage) >= dragThreshold) {
		// 		prevSlide();
		// 		introChange();
		// 	}
		// } else  {
		// 	percentage++;
		// 	if(percentage >= dragThreshold) {
		// 		nextSlide();
		// 		introChange();
		// 	}
		// }
		// Don't drag element. This is important.
		return false;
	};

	var touchEnd = function() {

		dragStart = null;

		if (percentage >= dragThreshold) {
			nextSlide();
			introChange();
		}
		else if ( Math.abs(percentage) >= dragThreshold ) {
			prevSlide();
			introChange();
		} else {
			// show current slide i.e. snap back
			showSlide();
		}

		percentage = 0;

	};

	//mobile event listener
	$('#projects').on({
		'touchstart': touchStart,
		'touchmove': touchMove,
		'touchend': touchEnd
	});


}); //end window onload
