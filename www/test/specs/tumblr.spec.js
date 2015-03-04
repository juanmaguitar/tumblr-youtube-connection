!function ( $, global ) {

	describe("A tumblr object that ", function() {

		var oTumblr = global.YOUTUMBLR.tumblr;

		describe("has a method 'subscribeToTopics' that", function() {

			it("should exist as method of the global YOUTUMBLR objects", function() {
				expect( typeof(oTumblr.subscribeToTopics) === "function").toBeTruthy();
			});

			it("subscribe a callback to the topic 'finishGetTumblrPosts' ", function() {

				var mockTopic = {
					publish: function(){},
					subscribe: function(){},
					unsubscribe: function(){}
				};

				spyOn($, 'Topic').and.returnValue(mockTopic);
				oTumblr.subscribeToTopics()
				expect( $.Topic ).toHaveBeenCalledWith('finishGetTumblrPosts');
				$.Topic.calls.reset();
			});

		});


		describe("has a method 'setEvents' that", function() {

			it("should exist as method of the global YOUTUMBLR objects", function() {
				expect( typeof(oTumblr.setEvents) === "function").toBeTruthy();
			});

			it("attach events 'click' & 'keypress' to UI elements to start getting the videos", function() {
					spyOn($.fn, 'bind');
					oTumblr.setEvents();
					expect( $.fn.bind.calls.count() ).toEqual(2);
					expect( $.fn.bind.calls.argsFor(0)[0] === "click" ).toBeTruthy();
					expect( $.fn.bind.calls.argsFor(1)[0] === "keypress" ).toBeTruthy();
					$.fn.bind.calls.reset();
			});

		});

		describe("has a method 'loadPosts' that", function() {

			it("should exist as method of the global YOUTUMBLR objects", function() {
				expect( typeof(oTumblr.loadPosts) === "function").toBeTruthy();
			});

			describe("request videos to YouTumblr API", function() {

				beforeEach(function() {
					spyOn( oTumblr, 'handleTumblrData');
					spyOn( $, 'ajax').and.callFake( function (params) {
						params.success({ foo: 'bar' });
					});
				});

				afterEach(function() {
					$.ajax.calls.reset();
						oTumblr.handleTumblrData.calls.reset();
				});

				it("doing the proper AJAX request", 	function() {

					var sApiUrl = "http://api.tumblr.com/v2/blog/";
					global.TUMBLR_API_KEY = "123456789";

					oTumblr.loadPosts(345);

					//console.log( JSON.stringify( $.ajax.calls.argsFor(0), null, 4 ) );
					//console.log( $.ajax.calls.argsFor(0)[0].url );

					expect( $.ajax.calls.count() ).toEqual(1);
					expect( $.ajax.calls.argsFor(0)[0].url.indexOf(sApiUrl) != -1 ).toBeTruthy();
					expect( $.ajax.calls.argsFor(0)[0].data.api_key === "123456789" ).toBeTruthy();
					expect( $.ajax.calls.argsFor(0)[0].data.offset === 345 ).toBeTruthy();

				});

			});

		});

		describe("has a method 'handleTumblrData' that", function() {

			var oApiData, oCustomData;


			$.Topic( "finishGetTumblrPosts" ).subscribe( function ( posts ) {
				oCustomData = posts;
			});

			beforeEach(function() {
				oCustomData = [];
				oApiData = {
					response : {
						total_posts : 3,
						posts : [
							{
								id : "whatever",
								slug: "jazz-hot",
								caption: "<h2>Jazz ‘Hot’</h2>",
								permalink_url : "https://vimeo.com/57987169",
								player : [{
									embed_code : '<iframe src="#"></iframe>'
								}]
							},
							{
								id : "6QJdaR2jqUo",
								slug: "man-of-constant-sorrow-soggy-bottom-boys",
								caption: "<h2>Man Of Constant Sorrow - Soggy Bottom Boys</h2>",
								permalink_url : "https://www.youtube.com/watch?v=6QJdaR2jqUo",
								player : [{
									embed_code : '<iframe src="#"></iframe>'
								}]
							},
							{
								id: "yjsJQ4EYRNM",
								slug: "my-kinda-love-art-farmer-jim-hall",
								caption: "<h2>My Kinda Love - Art Farmer, Jim Hall</h2>",
								permalink_url : "https://www.youtube.com/watch?v=yjsJQ4EYRNM",
								player : [{
									embed_code : '<iframe src="#"></iframe>'
								}]
							},
							{
								id : "bla bla bla",
								slug: "jazz-hot",
								caption: "<h2>Jazz ‘Hot’</h2>",
								permalink_url : "https://vimeo.com/57987169",
								player : [{
									embed_code : '<iframe src="#"></iframe>'
								}]
							},
							{
								id: "yjsJQ4EYRNM",
								slug: "my-kinda-love-art-farmer-jim-hall",
								caption: "<h2>My Kinda Love - Art Farmer, Jim Hall</h2>",
								permalink_url : "https://www.youtube.com/watch?v=yjsJQ4EYRNM",
								player : [{
									embed_code : '<iframe src="#"></iframe>'
								}]
							}
						]
					}
				}
			});

			it("filters videos received to get only youtube ones and add them to a global (file scope) array", 	function() {
					oTumblr.handleTumblrData(oApiData);
					expect( oCustomData.length ).toEqual(3);
			});

			it("creates a custom object per video add it to a global (file scope) array", 	function() {

					oTumblr.handleTumblrData(oApiData);

					expect( !!oCustomData[0].id ).toBeTruthy();
					expect( !!oCustomData[0].slug ).toBeTruthy();
					expect( !!oCustomData[0].video_id ).toBeTruthy();
					expect( !!oCustomData[0].url ).toBeTruthy();
					expect( !!oCustomData[0].embed_code ).toBeTruthy();

			});

			it("if videos received are 20 it calls for another request (the next 20 videos)", 	function() {

				spyOn(oTumblr, 'loadPosts');

				var oMassivePosts = oApiData.response.posts;
				Array.prototype.push.apply( oMassivePosts, oMassivePosts.slice(0) );
				Array.prototype.push.apply( oMassivePosts, oMassivePosts.slice(0) );
				oApiData.response.posts = oMassivePosts;

				expect( oApiData.response.posts.length ).toEqual(20);
				oTumblr.handleTumblrData(oApiData);
				expect( oTumblr.loadPosts ).toHaveBeenCalledWith(20);

				oTumblr.loadPosts.calls.reset();

			});

			it("when no more videos, it triggers the proper 'event' (finishGetTumblrPosts)", 	function() {

					var mockTopic = {
						publish: function(){},
						subscribe: function(){},
						unsubscribe: function(){}
					};
					spyOn($, 'Topic').and.returnValue(mockTopic);

					var oMassivePosts = oApiData.response.posts;
					Array.prototype.push.apply( oMassivePosts, oMassivePosts.slice(0) );


				oApiData.response.posts = oMassivePosts;

				expect( oApiData.response.posts.length ).toEqual(10);
				oTumblr.handleTumblrData(oApiData);
				expect( $.Topic ).toHaveBeenCalledWith('finishGetTumblrPosts');
				$.Topic.calls.reset();

			});

		});

	});

}( jQuery, window || global );