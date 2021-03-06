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
        <link rel="stylesheet" href="src/css/main.css">
        <!--<!(endif)-->

        <!--(if target prod )><!-->
        <link rel="stylesheet" href="build/main.css">
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
                <button class="ui-tumblr"><span>get videos</span></button >
            </section>

            <section id="tumblr_videos_found" class="hidden">
                <details data-videos-found="">
                    <summary><strong></strong> youtube videos found</summary>
                    <div>
                        <ol></ol>
                    </div>
                </details>
            </section>

            <button id="tumblr_to_youtube" class="hidden">add to youtube</button >

			<section id="migration_progress" class="hidden">

				<p id="adding_videos" ><strong>0</strong> videos of <em></em> added to playlist: <a target="_blank" href="https://www.youtube.com/playlist?list="></a></p>

				<div>

					<!-- arrow -->
			<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 496.3 147.6" enable-background="new 0 0 496.3 147.6" xml:space="preserve">
				<g>
					<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0" y1="78.9577" x2="478.3884" y2="78.9577">
						<stop  offset="0.2423" style="stop-color:#38B399"/>
						<stop  offset="1" style="stop-color:#FFFFFF"/>
					</linearGradient>
					<path fill="none" stroke="url(#SVGID_1_)" stroke-width="5" stroke-miterlimit="10" d="M2.2,11.4c85.8,170,350.4,181.1,474.2,15.4"
						/>
					<polygon fill="#FFFFFF" points="460.6,15.1 496.3,0 491.5,38.5 	"/>
				</g>
			</svg>

					<img src="img/logo-tumbrl.png">
					<div id="percentage" class="progress-0">
						<div class="overlay">
							<p><strong>0</strong>%
							<span>videos added</span></p>
						</div>
					</div>
					<img src="img/logo-youtube.png">
				</div>

			</section>

			<p id="process_completed" class="hidden"><strong>Process Completed!!</strong> <a href="https://www.youtube.com/playlist?list=" target="_blank">Check</a> your playlist now</p>

        </div> <!-- @end container -->

        <!-- github label -->
        <a href="https://github.com/juanmaguitar/tumblr-youtube-connection"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>

        <!--(if target dev)><!-->
        <script src="src/bower_components/jquery/dist/jquery.js"></script>
        <script src="src/bower_components/bluebird/js/browser/bluebird.js"></script>

        <script src="src/modernizr/modernizr.custom.js"></script>
        <script src="src/modernizr/details/details-test.js"></script>
        <script>
            Modernizr.load(
                {
                    test: Modernizr.details,
                    nope: [
                        'src/modernizr/details/details-pollyfill.js'
                    ],
                    complete: function() {
                        jQuery().details ?  $('details').details() : null ;
                    }
                }
            );
        </script>
        <script src="src/js/plugins/gplus-youtubeembed.js"></script>
        <script src="src/js/plugins/observer.js"></script>


        <script src="src/js/plugins.js"></script>
        <!-- <script src="src/js/main.js"></script> -->
        <script src="src/js/config.local.js"></script>
        <script src="src/js/auth.js"></script>
        <script src="src/js/tumblr.js"></script>
        <script src="src/js/youtube.js"></script>

        <!-- starting point of the app -->
        <script src="src/js/main.js"></script>

        <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
        <!--<!(endif)-->

        <!--(if target prod)><!-->
        <script src="build/tumblr-youtube-connection.min.js"></script>
        <!--<!(endif)-->

        <!--(if target prod_debug)><!-->
        <script src="src/tmp/tumblr-youtube-connection.js"></script>
        <!--<!(endif)-->

        <!--(if target prod || prod_debug )><!-->
        <script>
            Modernizr.load(
                {
                    test: Modernizr.details,
                    nope: [
                        // TO-DO: Fix double loading w/ yepnope.js (try another loaders)
                        // http://stackoverflow.com/questions/6400067/what-is-causing-my-scripts-to-be-requested-twice-while-using-modernizr-load-yep
                        "build/details-pollyfill.min.js"
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
				<script>
					(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
					function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
					e=o.createElement(i);r=o.getElementsByTagName(i)[0];
					e.src='//www.google-analytics.com/analytics.js';
					r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
					ga('create','UA-59054140-1');ga('send','pageview');
				</script>

    </body>
</html>
