# Tumblr YouTube Connection

This project do the following:

- Connects to a Tumblr Site and gets all the YouTube Videos
- Creates a YouTube playlist w/ all these videos found

## Install

After cloning the repository, you must launch `npm` & `bower` installers and execute `grunt`

    $ git clone https://github.com/juanmaguitar/tumblr-youtube-connection.git
    $ cd tumblr-youtube-connection
    $ cd www
    $ npm install
    $ bower install
    $ grunt

_Check [these solutions](http://stackoverflow.com/questions/23042166/grunt-contrib-sass-not-working-with-compass) if you find problems w/ compass_

## Setup

To test it you have to edit the file `www/_src/js/config.js` and add the proper oAuth and API keys

### Get a Tumblr API Key

Check the [Tumblr API documentation](https://www.tumblr.com/docs/en/api/v2#auth) 
Get your Tumblr _OAuth Consumer Key_ from [here](https://www.tumblr.com/oauth/apps)

![Tumblr API Key](www/img/tumblr_API.png)

And replaces the `MY_TUMBLR_API_KEY` string with your _OAuth Consumer Key_  in the `www/_src/js/config.js` file

    TUMBLR_API_KEY = 'MY_TUMBLR_API_KEY'

### Get a Google API Key

Check the [Google API documentation](https://developers.google.com/api-client-library/javascript/features/authentication) 

Get an _ID Client_ and an _API key_ from the Google APIs Console at [https://code.google.com/apis/console](https://code.google.com/apis/console)

![Google API Key](www/img/google_API.png) 

And replaces the...

- `MY_OAUTH2_CLIENT_ID_localhost_8080` string with your _ID Client_ 
- `MY_GOOGLE_API_KEY` string with your _API key_ 

... in the `www/_src/js/config.js` file

    GOOGLE_OAUTH2_CLIENT_ID = 'MY_OAUTH2_CLIENT_ID_localhost_8080'
    GOOGLE_API_KEY = 'MY_GOOGLE_API_KEY'

### More API Google settings

Look for the _YouTube Data API v3_ and activate it 

![YouTube API activation](www/img/youtube_api_activation.png) 

Then enter into its API 

![YouTube API exploration](www/img/youtube_api_explore.png) 

And _authorize requests using OAuth 2.0_ for the concrete methods we're using in this application: `gapi.client.youtube.playlists.insert` & `gapi.client.youtube.playlistItems.insert`


## Launching it locally

To launch it locally you just have to do from the terminal (asuming you have vagrant and virtual-box installed):

    $ cd tumblr-youtube-connection
    $ vagrant up

After that you'll have the project available in your browser in the URL

    http://localhost:8080/


_Thanks to [@carlosvillu](https://github.com/carlosvillu) for his help w/ the Google API and Promises management w/ BlueBird :)_ 
