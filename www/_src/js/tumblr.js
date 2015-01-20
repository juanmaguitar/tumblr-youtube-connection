(function () {
    "use strict";

    var video_posts = [],
        counter_videos_found = 0,
        offset = 0,
        tumblr_site;

    $.Topic( "finishGetTumblrPosts" ).subscribe( function () {
        $("#migrate_youtube").removeClass("hidden");
    } );


    $("#get_tumblr_videos").bind("click", function () {
        tumblr_site =$("#tumblr_site input").val();
        $(this).attr("disabled","disabled");
        loadPosts( offset );
    });

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

    function updateDomTumblrSite_Step1 (url) {

        $("#tumblr_site input").addClass("hidden");
        $("#tumblr_site span").html(url);

        $("#getting_videos em").html(url);
        $("#getting_videos").removeClass("hidden");

        $("#tumblr_videos_found").removeClass("hidden");
        $("#tumblr_videos_found em").html(url);

    }

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

})();