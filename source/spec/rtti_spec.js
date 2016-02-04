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

var rtti = require('rtti')();
var logFuncs = require('log');

logFuncs.setErrorLevel(5); // all Output
var moduleName = "RTTI-Spec]:";
var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
//var warningLog = logFuncs.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = logFuncs.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);


var string_number = {
	test: 'Andreas',
	zahl: 42
};

var string_array = {
	test: 'Andreas',
	zahlen: [1, 2, 3]
};

var number_array_object = [{
	item: "item",
	zahl: 3
}];

var string_array_of_objects = {
	test: 'Andreas',
	zahlen: number_array_object
};

var complex = {
	a: {
		test: 'Andreas',
		zahl: 1
	},
	b: {
		test: 'Hans',
		zahl: 2
	},
	b2: {
		test: 12,
		zahl: 2
	},
	c: {
		test: 'Udo',
		zahl: 3
	},
};


rtti.add('string_number', string_number);
rtti.add('string_array', string_array);
rtti.add('number_array_object', number_array_object);
rtti.add('string_array_of_objects', string_array_of_objects);



describe("Recognize types", function() {
	it("recognice an object with string and number", function() {
		expect(rtti.is('string_number', {
			test: 'Peter',
			zahl: 52
		})).toBe(true);
	});

	it("recognice a false object with string and string", function() {
		expect(rtti.is('string_number', {
			test: 'Peter',
			zahl: 'falsch'
		})).toBe(false);
	});

	it("recognice a object with string and false name as faulty", function() {
		expect(rtti.is('string_number', {
			test: 'Peter',
			zahlen: 1
		})).toBe(false);
	});

	it("recognice a object with string and empty array", function() {
		expect(rtti.is('string_array', {
			test: 'Peter',
			zahlen: []
		})).toBe(true);
	});

	it("recognice a object with string and homogenous array", function() {
		expect(rtti.is('string_array', {
			test: 'Peter',
			zahlen: [1, 2]
		})).toBe(true);
	});

	it("recognice a object with string and heterogenous array", function() {
		expect(rtti.is('string_array', {
			test: 'Peter',
			zahlen: [1, '2']
		})).toBe(false);
	});


	it("recognice a object with an array of objects", function() {
		expect(rtti.is('string_array_of_objects', {
			test: 'Peter',
			zahlen: [{
				item: 'test',
				zahl: 3
			}]
		})).toBe(true);
	});


	it("recognice a faulty object with an array of objects", function() {
		expect(rtti.is('string_array_of_objects', {
			test: 'Peter',
			zahlen: [{
				item: 'test',
				zahl: '3'
			}]
		})).toBe(false);
	});


	it("filters objects on type", function() {
		var counter = 0;
		var sum = 0;
		rtti.forEachInIs(complex, 'string_number', function(value) {
			++counter;
			sum += value.zahl;
		});
		expect(counter).toBe(3);
		expect(sum).toBe(6);
	});

});