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


var testjobs = require('test_jobs')();
var defaultuser = require('defaultuser');
var logFuncs = require('log');

logFuncs.setErrorLevel(5); // all Output
var moduleName = "API-Spec]:";
var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
//var warningLog = logFuncs.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = logFuncs.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);

///////////////////////////////////////////////////////////////////////////////
///	Reset the DB first, add a default user
///
///
var baseurl = 'http://localhost:8080/api';
describe("Can we reset the DB?", function() {
	var message;
	beforeEach(function(done) {
		rest.post(baseurl + '/reset', {
			data: {
				email: defaultuser.email,
				password: defaultuser.password
			}
		}).on('complete', function(resobj) {
			message = resobj.message;
			done();
		});

	});
	it("Should be cleared", function(done) {
		expect(message).toBe('databases cleared!');
		done();
	});
});


///////////////////////////////////////////////////////////////////////////////
///	Access the API 
///
describe("Can we access the API?", function() {
	beforeEach(function(done) {
		rest.get(baseurl, {
			data: {
				email: defaultuser.email,
				password: defaultuser.password
			}
		}).on('complete', function(resobj) {
			dbgLog(baseurl, resobj.message);
			done();
		});

	});
	it("Should be reached", function(done) {
		expect(true).toBe(true);
		done();
	});
});

///////////////////////////////////////////////////////////////////////////////
///	Get an entry via API
///
var maindir;
describe("Can we get the main directory?", function() {
	var response;
	beforeEach(function(done) {
		rest.get(baseurl + '/dir', {
			data: {
				email: defaultuser.email,
				password: defaultuser.password
			}
		}).on('complete', function(resobj) {
			response = resobj;
			done();
		});

	});

	it("gets a response from /api/dir", function() {
		expect(response).not.toBe(undefined);
	});

	it("gets a defined response from /api/dir", function() {
		expect(response.dir).not.toBe(undefined);
	});

	it("gets a string response from /api/dir", function() {
		expect(typeof response.dir).toBe('string');
	});

	it("gets a string response length > 0 from /api/dir", function(done) {
		expect(response.dir.length).not.toBe(0);
		maindir = response.dir;
		done();
	});

});


///////////////////////////////////////////////////////////////////////////////
///	Try to send a job offer
///
describe("send a job ", function() {
	var response;
	beforeEach(function(done) {

		var filename = 'test.pdf';

		testjobs.createPDF(filename);

		var stats = fs.statSync(filename);


		rest.post(baseurl + '/job', {
			multipart: true,
			data: {
				email: defaultuser.email,
				jobtitle: "Entwickler",
				api: true,
				file: rest.file(filename, null, stats.size, null, 'application/pdf')
			}
		}).on('complete', function(resobj) {
			response = resobj;
			done();
		});

	});

	it("gets a response on posting a job", function() {
		expect(response.error).toBe(undefined);
	});

	it("the job has an id", function() {
		expect(response._id).not.toBe(undefined);
	});

	it("the job has a title", function() {
		expect(response.jobtitle).toBe("Entwickler");
	});

});