/* exported and globals are options of JShint see  http://jshint.com/docs/*/

/* exported isTrue, isArray. log, delegate, requestObject, requireJS, http */
/* globals module:true, require:true, Storage */

'use strict';

function log() {
	// arguments to std. array
	var args = Array.prototype.slice.call(arguments);
	// insert at the beginning
	args.unshift('log:');
	// use console.log with an array
	console.log.apply(console, args);
}

function isArray(a) {
	return Object.prototype.toString.apply(a) === '[object Array]';
}

// Iteration über alle Attribute eines Objekts
// Action: Callback mit 2 Parametern
function forEachIn(object, action) {
	for (var prop in object) {
		if (Object.prototype.hasOwnProperty.call(object, prop)) {
			if (typeof object[prop] !== 'function') {
				action(prop, object[prop]);
			}
		}
	}
}

/**
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
function delegate(object, method) {
	return function() {
		method.apply(object, arguments);
	};
}

function http(verb, url, obj, cb) {
	var request = new XMLHttpRequest();
	// log('XMLHttpRequest ' + verb);
	var callback = cb || function(text) {
		log('XMLHttpRequest post gets' + text);
	};

	request.open(verb, url, true);
	request.onreadystatechange = function() {
		// log('onreadystatechange ', request.readyState, request.status);
		if (request.readyState === 4) {
			callback(request.responseText);
		}
	};
	if (obj) {
		request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		request.send(JSON.stringify(obj));
	} else {
		request.send();
	}
}

function dom(tag, attributes) {
	//
	tag = tag || 'H1';
	tag = tag.toUpperCase();
	attributes = attributes || [];
	var node = document.createElement(tag);
	if (attributes) {
		forEachIn(attributes, function(key, value) {
			node.setAttribute(key, value);
		});
	}
	for (var i = 2; i < arguments.length; ++i) {
		var child = arguments[i];
		if (typeof child === "string") {
			child = document.createTextNode(child);
			node.textnode = child;
		}
		node.appendChild(child);
	}
	return node;
}


/**
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
function requireJS(url, cb) {
	var js = dom('script', {
		'src': url
	});
	cb = cb || function() {};
	js.onload = function() {
		cb();
		removeChild(js);
	};
	document.body.appendChild(js);
}

function formPost(url, formdata) {

	var form = dom('form', {
		'action': url,
		'method': 'POST',
		'role': 'form',
		'enctype': 'multipart/form-data'
	});

	var input;
	forEachIn(formdata, function(key, obj) {
		var type = obj.type || 'text';
		input = dom('input', {type: type, name: key});
		input.value = obj.value || 0;
		form.appendChild(input);
	});

	document.body.appendChild(form);

	form.submit();
}


function removeChildren(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function removeChild(node) {
	node.parentNode.removeChild(node);
}


Date.prototype.datum = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	var hh = this.getHours().toString();
	var mi = this.getMinutes().toString();
	return (dd[1] ? dd : "0" + dd[0]) + '.' + (mm[1] ? mm : "0" + mm[0]) + '.' + yyyy + ' ' + (hh[1] ? hh : "0" + hh[0]) + ':' + (mi[1] ? mi : "0" + mi[0]); // padding
};

/**
 * this file may be used from both a browser and node.js
 * if it is used from node; there is a global variable "module"
 *
 */

if (typeof module === "undefined") {

	// Speichern von Objekten im localStorage
	// Die Objekte werden in einen String umgewandelt.
	Storage.prototype.setObject = function(key, value) {
		this.setItem(key, JSON.stringify(value));
	};

	// Holen von Objekten aus localStorage
	Storage.prototype.getObject = function(key) {
		var value = this.getItem(key);
		if (value) {
			try {
				value = JSON.parse(value);
			} catch (e) {
				console.log('Cannot parse ' + value + ' got ' + e);
			}
		}
		return value;
	};

	var module = {};
	module.exports = {};
	module.exports.isbrowser = true;
	var require = require || function() {
		return module.exports;
	};
	module.exports.dom = dom;
	module.exports.removeChildren = removeChildren;
	module.exports.removeChild = removeChild;


}

module.exports.isArray = isArray;