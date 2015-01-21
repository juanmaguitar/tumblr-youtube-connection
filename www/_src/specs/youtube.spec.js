describe("A youtube.js file that ", function() {

  it("subscribes to the 'finishGetTumblrPosts' topic to do some stuff", function() {
      expect(true).toBe(true);
    });

  it("attach an event to the click of '#migrate_youtube' to start migrating the videos to youtube", function() {
      expect(true).toBe(true);
    });

	describe("has a function 'promiseCreatePlaylist' that", function() {

		it("returns a Promise that calls the youTube API to create the playlist", 	function() {
			expect(true).toBe(true);
  		});


    it("use proper data in the youTube API request to create the playlist",   function() {
      expect(true).toBe(true);
      });
    });

  describe("has a function 'afterPlaylistCreated' that", function() {

    it("calls some function to update the UI", function() {
      expect(true).toBe(true);
      });


    it("return list of videos to be inserted",   function() {
      expect(true).toBe(true);
      });
    });

  describe("has a function 'promiseAddToPlaylist' that", function() {

    it("returns a Promise that calls the youTube API to add a video to the playlist",   function() {
      expect(true).toBe(true);
      });


    it("use proper data in the youTube API request to create the playlist",   function() {
      expect(true).toBe(true);
      });


    it("calls some function to update the UI after every video is inserted", function() {
      expect(true).toBe(true);
      });
    });


});