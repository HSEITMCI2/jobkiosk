/* global process, require, GLOBAL, __dirname, module */


'use strict';
var env = process.argv[2] || process.env.NODE_ENV || 'development';

var path = require('path');
var PDFDocument = require('pdfkit');
var os = require('os');
var fs = require('fs');


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


function Implementation() {
	var that = {};

	that.create = function(filename, header, text) {
		dbgLog("creating PDF", filename);
		var doc = new PDFDocument();

		doc.pipe(fs.createWriteStream(filename));
		doc.fontSize(25)
			.text(header, 100, 100)
			.fontSize(8)
			.text(text, 100, 150, {width: 410, align: 'left'});

		doc.fillColor("blue")
			.text('Link', 100, 400)
			.link(100, 400, 60, 8, 'http://www.hs-esslingen.de/');

		doc.end();
		dbgLog("created PDF", filename);
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
