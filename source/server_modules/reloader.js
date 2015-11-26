
GLOBAL.searchpaths(module);
var realtime = require('realtime');
var browser = require('browser');
var log = require('log');
var moduleName = "reloader]:";
//var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
//var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
//var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);



module.exports = function(httpserver, port) {
	"use strict";
	var rtInterface = realtime(httpserver);
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on("line", function(data) {
		var cmd = data.trim();
		switch (cmd) {
			case "bye":
				dbgLog("Restart server");
				process.exit(0);
				break;
			case "reload":
				dbgLog("Reload browser ");
				rtInterface.socket.emit('reload');
				break;
			default:
				dbgLog("Received RL " + cmd);
		}
	});


	setTimeout(function() {
		if (rtInterface.getAudienceCounter() === 0) {
			dbgLog("No audience, starting browser");
			browser().start(port);
		} else {
			rtInterface.socket.emit('reload');
		}
	}, 3000);
};