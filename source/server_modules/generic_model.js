// load the things we need
var mongoose = require('mongoose');
var fs = require('fs');


GLOBAL.searchpaths(module);
var log = require('log');

var moduleName = "jobs]:";
var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);


function Model(modelname, fields) {
	"use strict";
	var that = {};
	var mongooseDB = require('db_connection')();
	var fields = fields || {
		title: String,
	}

	var schema = new mongoose.Schema(fields);
	var model = mongooseDB.model(modelname, schema);
	that.model = model;

	that.clear = function() {
		model.remove({}, function() {
			dbgLog('collection removed');
		});
	};

	that.add = function(obj, cb) {
		var doc = new model(obj);
		doc.save(function(err, job) {
			if (err) {
				errorLog('Add  ', err);
				cb({
					error: err
				});
			} else {
				dbgLog('Add ', job.jobtitle);
				cb(job);
			}
		});
	}


	return that;
}

function Interface() {
	"use strict";
	var singleton = null;

	return function() {
		if (singleton === null) {
			singleton = Model();
		}
		return singleton;
	};
}


module.exports = Interface();