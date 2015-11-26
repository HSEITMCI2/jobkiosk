"use strict";

var colors = {};
colors.Reset = "\x1b[0m";
colors.Bright = "\x1b[1m";
colors.Dim = "\x1b[2m";
colors.Underscore = "\x1b[4m";
colors.Blink = "\x1b[5m";
colors.Reverse = "\x1b[7m";
colors.Hidden = "\x1b[8m";

colors.FgBlack = "\x1b[30m";
colors.FgRed = "\x1b[31m";
colors.FgGreen = "\x1b[32m";
colors.FgYellow = "\x1b[33m";
colors.FgBlue = "\x1b[34m";
colors.FgMagenta = "\x1b[35m";
colors.FgCyan = "\x1b[36m";
colors.FgWhite = "\x1b[37m";

colors.BgBlack = "\x1b[40m";
colors.BgRed = "\x1b[41m";
colors.BgGreen = "\x1b[42m";
colors.BgYellow = "\x1b[43m";
colors.BgBlue = "\x1b[44m";
colors.BgMagenta = "\x1b[45m";
colors.BgCyan = "\x1b[46m";
colors.BgWhite = "\x1b[47m";


var currentErrorLevel = 0;
function xlog(title, fg, bg, level) {
	level = level || 0;
	var f = colors[fg] || colors.FgWhite;
	var b = colors[bg] || colors.BgBlack;
	var r = colors.Reset;

	return function() {
		if (currentErrorLevel > level) {
			var msg = '';
			for(var idx=0; idx<arguments.length; ++idx) {
				var arg = arguments[idx];
				if (typeof arg === 'object') {
					arg = JSON.stringify(arg);
				}
				msg += arg + " ";
			}
			console.log(f, b, currentErrorLevel, title, msg, r);
		}
	};
}

var dbgLog = xlog("[LOG", "FgBlack", "BgYellow", 0);


module.exports.setErrorLevel = function(level) {
	dbgLog("set error level to", level);
	// console.trace("setErrorLevel");
	currentErrorLevel = level;
};

module.exports.getErrorLevel = function() {
	dbgLog("error level is", currentErrorLevel);
};

module.exports.colors = colors;
module.exports.xlog = xlog;

