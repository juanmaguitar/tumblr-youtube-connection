// The client id is obtained from the Google APIs Console at https://code.google.com/apis/console
// If you run access this code from a server other than http://localhost, you need to register
// your own client id.
// https://developers.google.com/api-client-library/javascript/features/authentication

	// your CLIENT_ID pointing to "http://localhost:8080/""
var GOOGLE_OAUTH2_CLIENT_ID = 'MY_OAUTH2_CLIENT_ID_localhost_8080',

	// jsfiddle
	// OAUTH2_CLIENT_ID = '6114173627-k1lcg5rpis7c6p9bg10h03cir7fsgbrl.apps.googleusercontent.com',

	GOOGLE_OAUTH2_SCOPES = [
		'https://www.googleapis.com/auth/youtube',
		'https://www.googleapis.com/auth/youtube.readonly',
		'https://www.googleapis.com/auth/youtube.upload'
	],
	GOOGLE_API_KEY = 'MY_GOOGLE_API_KEY', // this key identifies me as a developer

	// https://www.tumblr.com/docs/en/api/v2
	TUMBLR_API_KEY = 'MY_TUMBLR_API_KEY', // this key identifies me as a developer

	PLAYLIST_DESCRIPTION = "Playlist w/ videos from http://";
	PLAYLIST_CREATION = "Created on ";
