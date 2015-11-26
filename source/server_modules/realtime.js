// realtime module: used by reloader

var io = require('socket.io');
var log = require('./log');


var moduleName = "Realtime]:";
//var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
//var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
//var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);

module.exports = function(app, callbacks) {
	"use strict";
	var that = {};

	var audienceCounter = 0;
	var uniqueID = 0;

	callbacks = callbacks || {
		"init": function(obj, id) {
			dbgLog("init from client", id, audienceCounter);
		}
	};

	that.socket = io.listen(app, {
		log: true
	});

	// register events per socket
	function onEvent(socket, name, cb, id) {
		socket.on(name, function(obj) {
			cb(obj, id);
		});
	}

	that.getAudienceCounter = function() {
		return audienceCounter;
	};

	that.socket.on('connection', function(socket) {
		var clientID = ++uniqueID;
		++audienceCounter;
		// dbgLog('Client # ', clientID, "enters. Audience: ", audienceCounter);

		socket.on('disconnect', function() {
			// dbgLog('Client # ', clientID, "leaves.  Audience: ", audienceCounter);
			--audienceCounter;
		});

		for (var cb in callbacks) {
			if (callbacks.hasOwnProperty(cb)) {
				onEvent(socket, cb, callbacks[cb], clientID);
			}
		}

		socket.emit('init', {
			id: clientID
		});
	});
	return that;
};