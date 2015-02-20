// "Observer" pattern implementation w/ jQuery
// http://api.jquery.com/jQuery.Callbacks/#pubsub

(function () {
	var topics = {};

	jQuery.Topic = function( id ) {
	  var callbacks, method,
	    topic = id && topics[ id ];

	  if ( !topic ) {
	    callbacks = jQuery.Callbacks("unique stopOnFalse");
	    topic = {
	      publish: callbacks.fire,
	      subscribe: callbacks.add,
	      unsubscribe: callbacks.remove
	    };
	    if ( id ) {
	      topics[ id ] = topic;
	    }
	  }
	  return topic;
	};
})();