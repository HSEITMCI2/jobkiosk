
var fs = require('fs');

GLOBAL.searchpaths(module);
var log = require('log');
var pdf = require('pdfcreator')();

var moduleName = "testjobs]:";
var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = log.xlog("[Debug " + moduleName, "FgYellow", "BgGreen", 3);


function CreateJobs() {
	"use strict";
	var that = {};


	that.createPDF = function(filename, header, text) {
		pdf.create(filename, header, text);
	}

	return that;
}


function TestJobs() {
	"use strict";
	var singleton = null;

	return function() {
		if (singleton === null) {
			singleton = CreateJobs();
		}
		return singleton;
	};
}


module.exports = TestJobs();