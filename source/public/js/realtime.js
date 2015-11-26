/* global io, log, requireJS */
/* exported InitRealtime */

/**
 * set up realtime connection with server
 */

"use strict";

function InitRealtime() {

	var that = {};
	that.socket = null;

	function autosetup() {
		that.setup();
	}
	setTimeout(autosetup, 1000);

	/**
	 * connect with server, initialize callbacks
	 * @param  {object} callbacks key/callback-function
	 * @return {undefined}         
	 */
	that.setup = function(callbacks) {
		callbacks = callbacks || {
			"reload": function reload() {
				location.reload();
			},
			"init": function init(obj) {
				log("Got RT init with ID", obj.id);
				that.send('init', {
					"hello": "world"
				});
			}
		};

		function onEvent(name, cb) {
			if (that.socket !== null) {
				that.socket.on(name, function(obj) {
					cb(obj);
				});
			}
		}

		// Connect to the Realtime-Server
		if (that.socket === null) {
			that.socket = io.connect();
			for (var cb in callbacks) {
				if (callbacks.hasOwnProperty(cb)) {
					onEvent(cb, callbacks[cb]);
				}
			}
		} // if that.socket
	}; // setup

	that.send = function(name, data) {
		that.socket.emit(name, data);
	};

	return that;
}

var RealtimeConnection = null;

requireJS('/js/libs/socket.io.js', function() {
	RealtimeConnection = InitRealtime();
});