!function ( $ ) {
    "use strict";

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
        tumblr_site;

    // Topic Subscriptions
    $.Topic( "finishGetTumblrPosts" ).subscribe( function () {
        $("#migrate_youtube").removeClass("hidden");
    } );

    // Events
    $("#get_tumblr_videos").bind("click", function () {
        tumblr_site =$("#tumblr_site input").val();
        $(this).attr("disabled","disabled");
        loadPosts( offset );
    });

    /**
     * Get Tumlbr posts via AJAXLoad.
     * @param {String} offset The initial position in the list of items requested (to avoid 20 items limit per request)
     */
    function loadPosts(offset) {
        $.ajax({
            url: "http://api.tumblr.com/v2/blog/" + tumblr_site + "/posts",
            data: {
                api_key: TUMBLR_API_KEY,
                type: 'video',
                offset: offset
            },
            dataType: "jsonp",
            success: handleTumblrData
        });
    }

    /**
     * Update UI w/ new values after clicking "get videos from tumblr" button.
     * @param {String} url The url of the Tumblr site
     */
    function updateDomTumblrSite_Step1 (url) {

        $("#tumblr_site input").addClass("hidden");
        $("#tumblr_site span").html(url);

        $("#getting_videos em").html(url);
        $("#getting_videos").removeClass("hidden");

        $("#tumblr_videos_found").removeClass("hidden");
        $("#tumblr_videos_found em").html(url);

    }

    /**
     * Update UI w/ new values after every group of data is received from the AJAX call.
     * @param {Object} data Data of the youtube video (already filtered)
     * @param {Number} total Total of videos found on Tumblr Site
     */
    function updateDomEveryVideosFound_Step2 ( data, total ) {

       $("#getting_videos span").html(function(item, content) {
            return content+".";
        });

        $("#tumblr_videos_found strong").html( total );

        $("#tumblr_videos_found ol")
            .append(
                $("<li>")
                    .html( data.embed_code )
                    .append( $("<p>").html(data.slug) )
            );

    }

    /**
     * Process videos received from API Tumblr
     * - Update UI w/ new info every 20 items received
     * - Do another AJAX call (loadPosts) if items received were 20
     * - When finished, trigger the proper "finish" event
     * @param {Object} data Data of the youtube video (already filtered)
     * @param {Number} total Total of videos found on Tumblr Site
     */
    function handleTumblrData (data) {

        var slug_treated, $slug, current_video, url_video,
            total_posts = data.response.total_posts;

        updateDomTumblrSite_Step1 ( tumblr_site ) ;

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

                updateDomEveryVideosFound_Step2 ( current_video, counter_videos_found );


            }
        });

        if (data.response.posts.length == 20) {
            optimizeYouTubeEmbeds();
            offset += 20;
            loadPosts(offset);
        }
        else {
            optimizeYouTubeEmbeds();
            $.Topic( "finishGetTumblrPosts" ).publish(video_posts);
        }

    }

}( jQuery );