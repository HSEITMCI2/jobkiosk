/* global describe, expect */

// this is the library to be tested
var mod = require('../public/js/lib.js');

if (mod.isbrowser) {

	describe("Does the filereader exist?", function() {
		it("has window.File", function() {
			expect(window.File).not.toBe(undefined);
		});
		it("has window.FileReader", function() {
			expect(window.FileReader).not.toBe(undefined);
		});
		it("has window.FileList", function() {
			expect(window.FileList).not.toBe(undefined);
		});
		it("has window.Blob", function() {
			expect(window.Blob).not.toBe(undefined);
		});
	});


	describe("Use the /api", function() {
		'use strict';

		var response = {};
		var maindir = '';
		beforeEach(function(done) {
			http('get', '/api/dir', {}, function(responseText) {
				response = JSON.parse(responseText);
				done();
			});
		});

		it("gets a response from /api/dir", function() {
			expect(response).not.toBe({});
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


	describe("Testing GET /api/jobs", function() {
		'use strict';

		var response = {};
		beforeEach(function(done) {
			http('get', '/api/jobs', {}, function(responseText) {
				response = JSON.parse(responseText);
				done();
			});
		});

		it("gets a response from /api/jobs", function() {
			expect(response).not.toBe({});
		});

		it("gets no error message from /api/jobs", function() {
			expect(response.message).toBe(undefined);
		});

		it("gets an array from /api/jobs", function() {
			expect(response.length).not.toBe(undefined);
		});

		it("gets an array from /api/jobs", function() {
			expect(response.length).not.toBe(0);
		});
	});


	describe("Testing GET /api/profile", function() {
		'use strict';

		var profile = {};
		beforeEach(function(done) {
			http('get', '/api/profile', {}, function(responseText) {
				profile = JSON.parse(responseText);
				done();
			});
		});

		it("gets a response from /api/profile", function() {
			expect(profile).not.toBe({});
		});


		it("gets an array from /api/profile", function() {
			expect(profile.email).not.toBe(undefined);
		});

		it("gets an array from /api/profile", function() {
			expect(profile.email.length).not.toBe(0);
		});
	});

}