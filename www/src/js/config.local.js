(function ( win ) {

	// The client id is obtained from the Google APIs Console at https://code.google.com/apis/console
	// https://developers.google.com/api-client-library/javascript/features/authentication

	win.GOOGLE_OAUTH2_CLIENT_ID = 'MY_OAUTH2_CLIENT_ID';

	win.GOOGLE_OAUTH2_SCOPES = [
			'https://www.googleapis.com/auth/youtube',
			'https://www.googleapis.com/auth/youtube.readonly',
			'https://www.googleapis.com/auth/youtube.upload'
		];

	win.GOOGLE_API_KEY = 'MY_GOOGLE_API_KEY';

	// https://www.tumblr.com/docs/en/api/v2
	win.TUMBLR_API_KEY = 'MY_TUMBLR_API_KEY';

})( window );