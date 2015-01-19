var percentage_add_videos = 0,
    counter_videos_found = 0,
    counter_add_videos = 0,
    video_posts;


$.Topic( "finishGetTumblrPosts" ).subscribe( function ( posts ) {
    counter_videos_found = posts.length;
    video_posts = posts;
});

function updateDomPlaylistData_Step3 (data) {

    console.log (data);
    $('#playlist-id').html(data.id);

    $('#playlist-title').html(data.title);
    $('#playlist_creation strong').html(data.title);

    $('#playlist-description').html(data.description);

    $('#playlist_creation').removeClass("hidden");
    $('#playlist-button').attr("disabled", "disabled");

    $('#adding_videos em:nth-child(1)').html(counter_videos_found);
    $('#adding_videos em:nth-child(2)').html(data.title);
    $('#adding_videos em:nth-child(3)').html(percentage_add_videos+"%");

    $('#adding_videos').removeClass("hidden");
    $('#videos_addition_completed').removeClass("hidden");
    $('#videos_addition_completed strong:nth-child(2)').html(data.title);

}


$("#migrate_youtube").bind ("click", function() {

    var playlist_data = {},
        self = this;

    PromiseCreatePlaylist().then( function(response){

       var result = response.result;

        if (result) {

            console.log ("result");
            console.log (result);
            $(self).attr("disabled","disabled");

            playlist_data = {
              id:  result.id,
              title: result.snippet.title,
              description: result.snippet.description,

            };

            updateDomPlaylistData_Step3 (playlist_data);

        }

        return video_posts;

    } )
    .each( function(video){
        return PromiseAddToPlaylist(playlist_data.id, video);
    } )
     .then(function() {
        $("#process_completed").removeClass("hidden");
        $("#process_completed a").attr("href",function(i, content) {
          return content+playlist_data.id;
        });
    } );
});

function getToday() {

  var today = new Date(),
      dd = today.getDate(),
      mm = today.getMonth()+1, //January is 0!
      yyyy = today.getFullYear();

    if( dd < 10 ) {
        dd='0'+dd;
    }

    if (mm < 10) {
        mm='0'+mm;
    }

    return dd+'/'+mm+'/'+yyyy;

}


function PromiseCreatePlaylist() {

    var tumblr_site = $("#tumblr_site input").val(),
        playlist_description = PLAYLIST_DESCRIPTION + tumblr_site;

    playlist_description += "\n " + PLAYLIST_CREATION + getToday() + " from " + document.URL;

    return new Promise( function(resolve){

       gapi.client.youtube.playlists.insert({
            part: 'snippet,status',
            resource: {
                snippet: {
                    title: "@"+tumblr_site,
                    description: playlist_description
                },
                status: {
                    privacyStatus: 'private'
                }
            }
       }).execute( resolve );
    } );

}


function PromiseAddToPlaylist(playlist_id, video, startPos, endPos){

    counter_add_videos++;
    percentage_add_videos = (counter_add_videos/counter_videos_found)*100;

    var details = {
        videoId: video.video_id,
        kind: 'youtube#video'
      };

    if (startPos !== undefined) {
      details.startAt = startPos;
    }
    if (endPos !== undefined) {
      details.endAt = endPos;
    }

    return new Promise( function(resolve){

        gapi.client.youtube.playlistItems.insert({
            part: 'snippet',
            resource: {
                snippet: {
                    playlistId:  playlist_id,
                    resourceId: details
                }
            }
        }).execute(function(response){

          console.log (response);
            var videoTitle = response.result.snippet.title,
                videoId = response.result.snippet.resourceId.videoId,
                videoUrl = video.url;

            $('#adding_videos strong').html(parseInt(percentage_add_videos,10)+"%");
            $('#adding_videos span').html(function(item, content) {
                return content+".";
            });

            $('#videos_addition_completed strong:nth-child(1)').html(counter_add_videos);

            $("#videos_addition_completed ol")
                .append(
                    $("<li>")
                        .html( video.embed_code )
                        .append( $("<p>").html(video.slug) )
                );

            optimizeYouTubeEmbeds();
            resolve(response);



        });
    } );
}
