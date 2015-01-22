!function ( $, win ) {
	"use strict";

	win.YOUTUMBLR.tumblr
		.subscribeToTopics()
		.setEvents();

	win.YOUTUMBLR.youtube
		.subscribeToTopics();

}( jQuery, window );
