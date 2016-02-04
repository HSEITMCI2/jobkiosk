/* global log, isArray, forEachIn */


GLOBAL.searchpaths(module);

var logFuncs = require('log');


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


function rttiFactory() {
	'use strict';

	var rtti = {};
	var types = {};
	var proto = {};

	function type(obj) {
		if (isArray(obj) ) {
			return 'array';
		} else {
			return typeof obj;
		}
	}

	rtti.has = function(parent, child) {
		if (parent[child] && rtti.is(child, parent[child]) ) {
			return true;
		}
		return false;
	}


	rtti.forEachInIs = function(object, name, action) {
		forEachIn(object, function(key, value) {
			if (rtti.is(name, value)) {
				action(value);
			}
		});
	}


	rtti.is = function(name, obj) {
		if (types[name] !== undefined) {
			if (types[name] === type(obj)) {
				if (types[name] === 'object') {
					var is_same = true;
					forEachIn(proto[name], function(key, value) {
						if (type(obj[key]) !== type(value) ) {
							is_same = false;
						}
						if (! rtti.is(name+'.'+key, obj[key]) ) {
							is_same = false;
						}
					});
					return is_same;
				} // object
				if (types[name] === 'array' && obj.length > 0) {
					var is = true;
					for(var i=0; i< obj.length; ++i) {
						is = is && rtti.is(name+'.0', obj[i]);
						if (!is) {
							return false;
						}
					}
					return is;
				} // array
				return true;	// basic type is equal
			} else {
				return false; 	// basic type is not equal
			}
		} else {
			return false;		// unknown type
		}
	};

	rtti.add = function(name, obj) {
		if (types[name] === undefined) {
			types[name] = type(obj);
			proto[name] = obj;
			if (types[name] === 'object') {
				forEachIn(obj, function(key, value) {
					rtti.add(name+'.'+key, value);
				});
			}
			if (types[name] === 'array' && obj[0] !== undefined) {
				rtti.add(name+'.0', obj[0]);
			}
		}
	};


	return rtti;
}

module.exports = rttiFactory;

