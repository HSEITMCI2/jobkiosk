/* global describe, expect */

var fs = require('fs');
var path = require('path');
var rest = require('restler');

GLOBAL.searchpaths = (function(mod) {
	var searchdirs = [
		path.resolve(__dirname, "../server_modules"),
		path.resolve(__dirname, "../spec"),
	];
	// module is not global!
	return function(mod) {
		for (var idx = 0; idx < searchdirs.length; ++idx) {
			mod.paths.push(searchdirs[idx]);
		}
	};
}());

GLOBAL.searchpaths(module);
var logFuncs = require('log');
logFuncs.setErrorLevel(5); // all Output
var moduleName = "Model-Spec]:";
var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);

//
//
//
//

require('db_connection')('mongodb://localhost:27017/test');

// Prepare DB
var models = require('generic_model')();
var schema = require('test_schema').schema;
var TestModel = models.addModel('Test', schema);

// Clear DB
TestModel.remove({}, function(){
	dbgLog('Cleared DB');
});

// Add one item
var item = new TestModel();
item.title = "Test";
item.author = "Max Mayer";
item.body = "Dies ist ein Test";
item.hidden = false;

item.save(function(err) {
	if (err) {
		errorLog('could not save data');
	}
});

describe("Create Models", function() {
	var len = 0;
	beforeEach(function(done) {
		TestModel.find({}, function(err, docs) {
			if (err) {
				errorLog(err);
			} else {
				len = docs.length;
			}
			done();
		});
	});

	it("has one data set", function() {
		expect(len).toBe(1);
	});
});