!function ( $, win ) {
	"use strict";

	var	oTumblr = win.YOUTUMBLR.tumblr,
		oYoutube = win.YOUTUMBLR.youtube;

	oTumblr.subscribeToTopics();
	oYoutube.subscribeToTopics();

    oTumblr.setEvents();

}( jQuery, window );
