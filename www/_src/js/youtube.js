!function ( $, win ) {
	"use strict";

	win.YOUTUMBLR = win.YOUTUMBLR || {};
	win.YOUTUMBLR.youtube = win.YOUTUMBLR.youtube || {};

	var oYoutube = win.YOUTUMBLR.youtube;

	/**
	* Percentage of videos added.
	* @type {Number}
	*/
	var percentage_add_videos = 0,

	/**
	* Total of videos found on Tumblr.
	* @type {Number}
	*/
	total_videos = 0,

	/**
	* Videos added to Youtube
	* @type {Number}
	*/
	counter_add_videos = 0,

	/**
	* Object containg data of the playlist created.
	* @type {Object}
	*/
	playlist_data = {},

	/**
	* Array w/ videos found/to-insert.
	* @type {}
	*/
	video_posts,

	/**
	 * Button to get tumblr videos
	 * @type {jQuery}
	 */
	$button_add_youtube = $("#tumblr_to_youtube"),

	// CONSTANTS
	PLAYLIST_DESCRIPTION = "Playlist w/ videos from http://",
	PLAYLIST_CREATION = "Created on ";

	/* helper */
	function getToday() {

		var today = new Date(),
				dd = today.getDate(),
				mm = today.getMonth()+1, //January is 0!
				yyyy = today.getFullYear();

		if( dd < 10 ) dd='0'+dd;
		if (mm < 10) mm='0'+mm;

		return dd+'/'+mm+'/'+yyyy;

	}


	// Topic Subscriptions
	oYoutube.init = function() {
		this.subscribeToTopics();
		this.setEvents();
	};

	// Topic Subscriptions
	oYoutube.subscribeToTopics = function() {

		var self = this;

		$.Topic( "finishGetTumblrPosts" ).subscribe( function ( posts ) {
			total_videos = posts.length;
			video_posts = posts;
			$("#tumblr_to_youtube").removeClass("hidden");
		});
	};

	// Events
	oYoutube.setEvents = function () {

		var self = this;

		$button_add_youtube.bind ("click", function() {
			var sCurrentStatus = "adding to youtube...".toUpperCase();
			$(this).html(sCurrentStatus).addClass("in_progress");
			$("#migration_progress").removeClass("hidden");
			self.promiseCreatePlaylist()
				.then( self.afterPlaylistCreated )
				.each( self.promiseAddToPlaylist )
				.then( updateUIprocessCompleted );
		});

	};

	/**
	* Promise that calls the YouTube API to create a Playlist and returns another Promise (chaining) when is done.
	*/
	oYoutube.promiseCreatePlaylist = function () {

		var tumblr_user = $("#tumblr_site input").val(),
				playlist_description = PLAYLIST_DESCRIPTION + tumblr_user + ".tumblr.com";

		playlist_description += "\n " + PLAYLIST_CREATION + getToday() + " from " + document.URL;

		return new Promise( function(resolve) {
			gapi.client.youtube.playlists.insert({
				part: 'snippet,status',
				resource: {
					snippet: {
						title: "@"+tumblr_user,
						description: playlist_description
					},
					status: {
						privacyStatus: 'private'
					}
				}
			}).execute( resolve ); // resolve (response) --> complete the promise
		});

	};

	/**
	* Call for the UI Update after playlist creation and returns list of videos to be inserted in the playlist.
	* @param {Objects} response API response
	*/
	oYoutube.afterPlaylistCreated = function(response){

		var result = response.result;

		if (result) {
			playlist_data = {
				id:  result.id,
				title: result.snippet.title,
				description: result.snippet.description,
			};
			updateUiPlaylist(playlist_data);
		}

		window.scrollTo(0,document.body.scrollHeight);

		return video_posts; // return array of videos to be treated w/ each (bluebird)

	};

	/**
	* Returns a Promise (chaining) that inserts a video into the recently created youTube playlist  (through its API) and solve it (the promise) once is created (so next promise can start through 'each')
	* @param {Object} video Video custom data
	* @returns {Object} Pronise
	*/
	oYoutube.promiseAddToPlaylist = function( video ){

		var playlist_id = playlist_data.id,
				details = {
					videoId: video.video_id,
					kind: 'youtube#video'
				};

		return new Promise( function(resolve) {
			gapi.client.youtube.playlistItems.insert({
				part: 'snippet',
				resource: {
					snippet: {
						playlistId:  playlist_id,
						resourceId: details
					}
				}
			}).execute( function (response) {
				counter_add_videos++;
				percentage_add_videos = (counter_add_videos/total_videos)*100;

				updateUIafterVideoInserted(response, video, counter_add_videos, percentage_add_videos);

				resolve(response);
			});
		});

	};

	/**
	* Update some UI elements to show which videos have been added
	* @param {Object} response Response from the YouTube API after the adition of the video
	* @param {Object} video Video custom data
	* @param {Number} counter_add_videos Total of added videos
	* @param {Number} percentage_add_videos Percentage of videos added from the total
	*/
	function updateUIafterVideoInserted ( response, video, counter_add_videos, percentage ) {

		console.log (video);
		console.log (counter_add_videos);

		var videoTitle = response.result.snippet.title,
			videoId = response.result.snippet.resourceId.videoId,
			videoUrl = video.url,

			// percentage adjustments
			parsedPercentage = parseInt(percentage,10),
			round5 = function (x){ return Math.ceil(x/5)*5; },
			roundedPercentage = round5(parsedPercentage),

			findProgressClass = function (index, css) {
				return (css.match (/(^|\s)progress-\S+/g) || []).join(' ');
			};

		$('#percentage')
			.removeClass (findProgressClass)
			.addClass ("progress-" + roundedPercentage)
			.find("p strong").html( roundedPercentage);


		$('#adding_videos strong').html(counter_add_videos);

	}


	function updateLinkContent(i, content) {
		return content+playlist_data.id;
	}

	/**
	* Updates UI to show the process have been completed
	*/
	function updateUIprocessCompleted () {

		$button_add_youtube.attr("disabled","disabled").removeClass("in_progress");
		$("#process_completed").removeClass("hidden");
		$("#process_completed a").attr("href", updateLinkContent );

		window.scrollTo(0,document.body.scrollHeight);

	}

	/**
	* Update UI to show data of the recently created playlist
	* @param {Object} data Playlist info
	*/
	function updateUiPlaylist (data) {

		$('#adding_videos em').html(total_videos);
		$('#adding_videos a')
			.attr("href", updateLinkContent )
			.html(data.title);

	}

}( jQuery, window );