// load the things we need
var mongoose = require('mongoose');

GLOBAL.searchpaths(module);
var log = require('log');
var moduleName = "Database]:";
var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
// var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);


function openDB() {
	'use strict';
	var mongooseDB = null;
	var is_opened = false;

	return function(url, cb) {
	
		cb = cb || function() {
			infoLog('db', url, 'is open');
			is_opened = true;
		};

		if (mongooseDB === null) {
			mongooseDB = mongoose.createConnection(url);
			infoLog('connecting db with', url);
			mongooseDB.on('error', errorLog);
			mongooseDB.once('open', cb);
		} 
		return mongooseDB;
	};
}


module.exports = openDB();