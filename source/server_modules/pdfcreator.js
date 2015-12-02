/* global process, require, GLOBAL, __dirname, module */


'use strict';
var env = process.argv[2] || process.env.NODE_ENV || 'development';

var path = require('path');
var PDFDocument = require('pdfkit');
var os = require('os');
var fs = require('fs');
var childProcess = require('child_process');
var spawn = childProcess.spawn;


GLOBAL.searchpaths(module);

var logFuncs = require('log');
var moduleName = "PDF Creator]:";
var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
var warningLog = logFuncs.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
var infoLog = logFuncs.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);

if (env === 'development') {
	infoLog('Module PDF Creator');
	dbgLog('Debug');
	errorLog('Error');
	warningLog('Warning');
} else {
	console.log('env', env);
}

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


function PDF2PNG(filename, density) {
	var proc;
	density = density || 300;
	// we use ImageMagick "convert"-command for conversion from PDF to PNG
	if (process.env.IMGMAG) {
		infoLog('ImageMagic Converter', process.env.IMGMAG);
		var target = filename + '.' + density + '.png'
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


function Implementation() {
	var that = {};

	that.sp2 = function(filename, header, text) {
		var doc = new PDFDocument();

		doc.pipe(fs.createWriteStream(filename));
		doc.font('fonts/BOD_R.TTF')
			.fontSize(25)
			.text(header, 100, 100)
			.fontSize(8)
			.text(text, 100, 150, {width: 410, align: 'left'});

		doc.fillColor("blue")
			.text('Link', 100, 400)
			.link(100, 400, 60, 8, 'http://www.hs-esslingen.de/');

		doc.end();

		PDF2PNG(filename, 72);
		PDF2PNG(filename, 300);
	};

	return that;
}



function SingletonFactory() {
	var singleton = null;

	return function() {
		if (singleton === null) {
			singleton = Implementation();
		}
		return singleton;
	};
}


module.exports = SingletonFactory();
