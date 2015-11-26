/* global describe, expect */

// this is the library to be tested
var mod = require('../public/js/lib.js');

describe("Testing DOM Functions", function() {
	'use strict';

	var node;
	if (mod.isbrowser) {

		beforeEach(function() {
			node = mod.dom('h2', {}, 'Hello World');
			document.body.appendChild(node);
		});

		it("dom has an new child", function() {
			var h1a = document.getElementsByTagName('h2');
			expect(h1a.length).toBe(1);
		});

		it("the new child contains the hello world", function() {
			var h1a = document.getElementsByTagName('h2');
			expect(h1a[0].textContent).toBe('Hello World');
		});

		afterEach(function() {
			if (node) {
				mod.removeChild(node);
				node = null;
			}
		});

	}

});