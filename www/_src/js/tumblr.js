!function ( $, win ) {

	"use strict";

	win.YOUTUMBLR = win.YOUTUMBLR || {};
	win.YOUTUMBLR.tumblr = win.YOUTUMBLR.tumblr  || {};

	var oTumblr = win.YOUTUMBLR.tumblr;

			/**
			 * List of videos (objects) found on Tumblr Site
			 * @type {Array}
			 */
	var video_posts = [],

			/**
			* Counter of videos found
			* @type {Number}
			*/
			counter_videos_found = 0,

			/**
			 * Offset The initial position in the list of items requested (to avoid 20 items limit per request)
			 * @type {Number}
			 */
			offset = 0,

			/**
			* URL of the Tumblr Site where to get the videos
			* @type {String}
			*/
			tumblr_site,

			/**
			 * Button to get tumblr videos
			 * @type {jQuery}
			 */
			$button_get_videos = $("#tumblr_site button"),

			/**
			 * Button to get tumblr videos
			 * @type {jQuery}
			 */
			$input_user_tumblr = $("#tumblr_site input");

	// Events
	oTumblr.setEvents = function () {

		var self = this;

		$button_get_videos.bind("click", function () {
			tumblr_site = $input_user_tumblr.val() + '.tumblr.com';
			deactivateUiTumblr(this);
			self.loadPosts( offset );
		});

		return self;

	};

	/**
	* Get Tumlbr posts via AJAXLoad.
	* @param {String} offset The initial position in the list of items requested (to avoid 20 items limit per request)
	*/
	oTumblr.loadPosts = function(offset) {

		var self = this;


		$.ajax({
			url: "http://api.tumblr.com/v2/blog/" + tumblr_site + "/posts",
			data: {
				api_key: TUMBLR_API_KEY,
				type: 'video',
				offset: offset
			},
			dataType: "jsonp",
			success: self.handleTumblrData
		});

	};

	/**
	* Process videos received from API Tumblr
	* - Update UI w/ new info every 20 items received
	* - Do another AJAX call (loadPosts) if items received were 20
	* - When finished, trigger the proper "finish" event
	* @param {Object} data Data of the youtube video (already filtered)
	* @param {Number} total Total of videos found on Tumblr Site
	*/
	oTumblr.handleTumblrData = function (data) {

		var self = oTumblr;

		var slug_treated, $slug, current_video, url_video,
				total_posts = data.response.total_posts;

		//updateUiVideosFound ( tumblr_site ) ;

		$.each(data.response.posts, function(i, item) {
			if ( /youtube/.test(item.permalink_url) ) {

				++counter_videos_found;
				slug_treated = item.slug.split("-").join(" ");
				url_video = item.permalink_url ;

				current_video = {
					id: item.id,
					video_id: url_video.replace("https://www.youtube.com/watch?v=",""),
					url: url_video,
					slug: slug_treated,
					embed_code: item.player[0].embed_code
				};

				video_posts.push ( current_video );

				updateUiVideosFound ( current_video, counter_videos_found );
			}

		});


		if (data.response.posts.length == 20) {
			optimizeYouTubeEmbeds();
			offset += 20;
			self.loadPosts(offset);
		}
		else {
			optimizeYouTubeEmbeds();
			$.Topic( "finishGetTumblrPosts" ).publish(video_posts);
		}

	};

	/**
	* Update UI w/ new values after clicking "get videos from tumblr" button.
	* @param {String} url The url of the Tumblr site
	*/
	function deactivateUiTumblr ( button ) {
		$(button).parent().addClass("disabled");
		$("."+button.className).attr("disabled", "disabled");
		$("#tumblr_videos_found").removeClass("hidden");
	}


	/**
	* Update UI w/ new values after every group of data is received from the AJAX call.
	* @param {Object} data Data of the youtube video (already filtered)
	* @param {Number} total Total of videos found on Tumblr Site
	*/
	function updateUiVideosFound ( data, total ) {

		$("#tumblr_videos_found strong").html( total );

		$("#tumblr_videos_found ol")
			.append(
				$("<li>")
					.html( data.embed_code )
					.append( $("<p>").html(data.slug) )
			);

	}

}( jQuery, window );