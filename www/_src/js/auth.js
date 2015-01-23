// This callback is invoked by the Google APIs JS client automatically when it is loaded.
// http://stackoverflow.com/questions/26794095/youtube-analytics-api-how-to-enter-key-daily-limit-for-unauthenticated-use-ex

googleApiClientReady = function() {
  gapi.client.setApiKey(GOOGLE_API_KEY);
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
};

// Attempt the immediate OAuth 2 client flow as soon as the page is loaded.
// If the currently logged in Google Account has previously authorized OAUTH2_CLIENT_ID, then
// it will succeed with no user intervention. Otherwise, it will fail and the user interface
// to prompt for authorization needs to be displayed.

function checkAuth() {
  gapi.auth.authorize({
    client_id: GOOGLE_OAUTH2_CLIENT_ID,
    scope: GOOGLE_OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handles the result of a gapi.auth.authorize() call.

function handleAuthResult(authResult) {
  if (authResult.status.signed_in) {
    // Auth was successful; hide the things related to prompting for auth and show the things
    // that should be visible after auth succeeds.
    $('body').addClass("js-oauth");
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable, and attempt a non-immediate OAuth 2 client flow.
    // The current function will be called when that flow is complete.
    $('.pre-auth').removeClass("hidden");
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Loads the client interface for the YouTube Analytics and Data APIs.
// This is required before using the Google APIs JS client; more info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client

function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}

// Once the api loads call a function to get the channel information.
function handleAPILoaded() {
  // do_nothing_for _now();
}
