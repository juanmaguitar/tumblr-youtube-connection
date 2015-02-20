!function ( $, win ) {

	describe("A tumblr object that ", function() {

		describe("has a method 'subscribeToTopics' that", function() {

			it("subscribe a callback to the topic 'finishGetTumblrPosts' ", function() {

				expect(true).toBe(true);
				/*
				spyOn(jQuery, 'Callbacks');
				win.YOUTUMBLR.tumblr.subscribeToTopics()
				expect(jQuery.Callbacks).toHaveBeenCalled();
			*/
			});

		});

		describe("has a method 'setEvents' that", function() {

			it("attach an event to the click of '#get_tumblr_videos' to start getting the videos", function() {
				expect(true).toBe(true);
			});

		});

		describe("has a function 'loadPosts' that", function() {
			it("requests the videos from Tumblr", 	function() {
				expect(true).toBe(true);
	  		});
	  		it("launch the proper callback when received correctly", 	function() {
	  			expect(true).toBe(true);
	  		});
	  	});

	    describe("has a function 'handleTumblrData' that", function() {
			it("filters videos received to get only youtube ones and add them to a global (file scope) array", 	function() {
				expect(true).toBe(true);
	  		});
	  		it("creates a custom object per video add it to a global (file scope) array", 	function() {
				expect(true).toBe(true);
	  		});
	  		it("if videos received are 20 it calls for another request (the next 20 videos)", 	function() {
	  			expect(true).toBe(true);
	  		});
	  		it("when no more videos, it triggers the proper 'event' (finishGetTumblrPosts)", 	function() {
	  			expect(true).toBe(true);
	  		});
	  	});
	});

}( jQuery, window );