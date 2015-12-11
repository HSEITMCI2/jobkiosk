/* global process, require, GLOBAL, module */

"use strict";
var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var spawn = childProcess.spawn;

GLOBAL.searchpaths(module);
var log = require('log');

var moduleName = "filehandler]:";
var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
// var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);


function FileHandler(maindir) {
	var that = {};
	// infoLog('FileHandler:', maindir);

	var dir = path.join(maindir, 'userfiles');
	fs.stat(dir, function(err) { // err, stats
		if (err) {
			fs.mkdir(dir, function(err) {
				if (err) {
					errorLog('Error in addUserDir', err);
				}
			});
		}
	});

	that.copyFile = function(source, target, cb) {
		var cbCalled = false;

		var rd = fs.createReadStream(source);
		rd.on("error", function(err) {
			done(err);
		});
		var wr = fs.createWriteStream(target);
		wr.on("error", function(err) {
			done(err);
		});
		wr.on("close", function() {
			done();
		});
		rd.pipe(wr);

		function done(err) {
			if (!cbCalled) {
				cb(err);
				cbCalled = true;
			}
		}
	};




	that.getMainDir = function() {
		return maindir;
	};

	that.addFile = function(userid, filename) {
		var dir = path.join(maindir, 'userfiles', userid);
		var full = path.join(dir, filename);
		// dbgLog("FileHandler:addFile ", full);
		return full;
	};

	that.addUserDir = function(userid, cb) {
		var dir = path.join(maindir, 'userfiles', userid);
		fs.stat(dir, function(err) {
			if (err) {
				fs.mkdir(dir, function(err) {
					cb(err);
				});
			} else {
				cb();
			}
		});
	};

	function d2s(type, data) {
		var str = data.toString();
		var lines = str.split(/(\r?\n)/g);
		for (var i = 0; i < lines.length; ++i) {
			var trimmed = lines[i].trim();
			if (trimmed.length > 0) {
				infoLog(type, trimmed);
			}
		}
	}

	that.PDF2PNGname = function(filename, density) {
		return filename + '.' + density + '.png';
	};


	that.PDF2PNG = function(filename, density) {
		var proc;
		density = density || 300;
		// we use ImageMagick "convert"-command for conversion from PDF to PNG
		if (process.env.IMGMAG) {
			infoLog('ImageMagic Converter', process.env.IMGMAG);
			var target = that.PDF2PNGname(filename, density);
			proc = spawn(process.env.IMGMAG, ['-density', density, '-quality', '100', '-flatten', filename, target]);
			proc.stdout.setEncoding('utf8');
			proc.stderr.setEncoding('utf8');
			proc.stdin.setEncoding('utf-8');

			proc.stdout.on('data', function(data) {
				d2s("PDF2PNG", data);
			});

			proc.stderr.on('data', function(data) {
				d2s("PDF2PNG err:", data);
			});

			return target;
		} else {
			infoLog('env IMGMAG is not defined');
		}
		return '';
	};

	return that;
}

function FileHandlerInterface() {
	var singleton = null;

	return function(maindir) {
		if (singleton === null) {
			singleton = FileHandler(maindir);
		}
		return singleton;
	};
}


module.exports = FileHandlerInterface();