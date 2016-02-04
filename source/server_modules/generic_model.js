// load the things we need
var mongoose = require('mongoose');
var fs = require('fs');


GLOBAL.searchpaths(module);
var log = require('log');

var moduleName = "Model]:";
var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);


function Model() {
	"use strict";
	var that = {};
	var mongooseDB = require('db_connection')();
	var modelbase = {};
	var fieldbase = {};

	that.addModel = function(modelname, fields) {
		if (typeof modelname === 'string' && modelname.length > 3) {
			modelname = modelname.toLowerCase();

			var fields = fields || {
				title: String,
			}

			var schema = new mongoose.Schema(fields);
			var model = mongooseDB.model(modelname, schema);
			modelbase[modelname] = model;
			fieldbase[modelname] = fields;

			return model;
		} else {
			errorLog('Error creating model 2', modelname, typeof modelname, modelname.length);
			return undefined;
		}
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