<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href='http://fonts.googleapis.com/css?family=Montserrat:700,400' rel='stylesheet' type='text/css'>

        <!--(if target dev || prod_debug )><!-->
        <link rel="stylesheet" href="_src/css/main.css">
        <!--<!(endif)-->

        <!--(if target prod )><!-->
        <link rel="stylesheet" href="_dist/main.css">
        <!--<!(endif)-->

    </head>
    <body>

        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

         <div class="container">

            <p id="logo">You<span>Tumblr</span></p>

            <p id="login-container" class="pre-auth hidden">This application requires access to your YouTube account. Please <a href="#" id="login-link">authorize</a> to continue.</p>

            <section id="tumblr_site">
                 <dl>
                     <dt>http://</dt>
                     <dd><input class="ui-tumblr" type="text" size="20"/><span>.tumblr.com</span></dd>
                </dl>
                <button class="ui-tumblr">get videos</button >
            </section>

            <section id="tumblr_videos_found" class="hidden">
                <details data-videos-found="">
                    <summary><strong></strong> youtube videos found</summary>
                    <div>
                        <ol></ol>
                    </div>
                </details>
            </section>

            <section id="tumblr_to_youtube" class="hidden">
                <button >add to youtube</button >
            </section>


            <details id="playlist_creation" class="hidden">
                <summary class="ok">Playlist <strong></strong> created!!</summary>
                <dl>
                    <dt>Playlist Id: </dt>
                    <dd id="playlist-id"></dd>
                    <dt>Playlist Title: </dt>
                    <dd id="playlist-title"></dd>
                    <dt>Playlist Description: </dt>
                    <dd id="playlist-description"></dd>
                </dl>
                <!-- <button id="playlist-button" disabled>Create a new Private Playlist</button> -->
            </details>

            <p id="adding_videos" class="hidden">Adding <em></em> videos to playlist <em></em> <strong></strong><br/><span></span></p>

            <details id="videos_addition_completed" class="hidden">
                <summary class="ok"><strong></strong> videos added to playlist <strong></strong>!!</summary>
                <div class="videos_container">
                    <ol></ol>
                </div>
            </details>


            <p id="process_completed" class="hidden"><strong>Process Completed!!</strong> <a href="https://www.youtube.com/playlist?list=" target="_blank">Check</a> your playlist now</p>

        </div> <!-- @end container -->

        <!--(if target dev)><!-->
        <script src="_src/bower_components/jquery/dist/jquery.js"></script>
        <script src="_src/bower_components/bluebird/js/browser/bluebird.js"></script>

        <script src="_src/modernizr/modernizr.custom.js"></script>
        <script src="_src/modernizr/details/details-test.js"></script>
        <script>
            Modernizr.load(
                {
                    test: Modernizr.details,
                    nope: [
                        '_src/modernizr/details/details-pollyfill.js'
                    ],
                    complete: function() {
                        jQuery().details ?  $('details').details() : null ;
                    }
                }
            );
        </script>
        <script src="_src/js/plugins/gplus-youtubeembed.js"></script>
        <script src="_src/js/plugins/observer.js"></script>


        <script src="_src/js/plugins.js"></script>
        <!-- <script src="_src/js/main.js"></script> -->
        <script src="_src/js/config.js"></script>
        <script src="_src/js/auth.js"></script>
        <script src="_src/js/tumblr.js"></script>
        <script src="_src/js/youtube.js"></script>

        <!-- starting point of the app -->
        <script src="_src/js/main.js"></script>

        <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
        <!--<!(endif)-->

        <!--(if target prod)><!-->
        <script src="_dist/tumblr-youtube-connection.min.js"></script>
        <!--<!(endif)-->

        <!--(if target prod_debug)><!-->
        <script src="_src/tmp/tumblr-youtube-connection.js"></script>
        <!--<!(endif)-->

        <!--(if target prod || prod_debug )><!-->
        <script>
            Modernizr.load(
                {
                    test: Modernizr.details,
                    nope: [
                        // TO-DO: Fix double loading w/ yepnope.js (try another loaders)
                        // http://stackoverflow.com/questions/6400067/what-is-causing-my-scripts-to-be-requested-twice-while-using-modernizr-load-yep
                        '_dist/details-pollyfill.min.js'
                    ],
                    complete: function() {
                        jQuery().details ?  $('details').details() : null ;
                    }
                }
            );
        </script>
        <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
        <!--<!(endif)-->

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <!--
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>
    -->
    </body>
</html>
