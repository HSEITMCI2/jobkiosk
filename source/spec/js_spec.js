/* global describe, expect */

// this is the library to be tested
var mod = require('../public/js/lib.js');


describe("JavaScript", function() {
	'use strict';

	it("creates an object", function() {
		var obj = {};
		expect(typeof obj).toBe('object');
	});

	it("creates an array", function() {
		var a = [];
		expect(mod.isArray(a)).toBe(true);
	});

	function Tier(a) {
		this.art = a || "tier";
	}

	function Insekt(b) {
		this.beine = b;
	}

	var tier = new Tier('tier');
	Insekt.prototype = tier;
	var insekt = new Insekt(6);

	it("uses a constructor", function() {
		expect(tier.art).toBe('tier');
	});

	it("uses a prototype", function() {
		expect(insekt.beine).toBe(6);
		expect(insekt.art).toBe('tier');
	});

	it("changes a prototype", function() {
		tier.art = "fisch";
		expect(insekt.art).toBe('fisch');
	});

	var arr = [{}, {}, {
		test: 4
	}];

	it("uses an array", function() {
		expect(arr[2].test).toBe(4);
	});

});

