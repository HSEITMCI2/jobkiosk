/**
 * Monitor and restart Node.js
 *
 */

var gutil = require('gulp-util');
var path = require('path');
var childProcess = require('child_process');
var spawn = childProcess.spawn;

module.exports = (function() {
	"use strict";
	var that = {};
	var verbose = true;
	var node = null;
	var args = ["app.js"];

	/**
	 * public interface to gulp; initialize paramenters & starts the node server
	 * @param  {opts.args} arguments for node server; 
	 * @param  {opts.verbose} show messages or not; 
	 */
	that.init = function(opts) {
		verbose = opts.verbose || verbose;
		args = opts.args || args;
		startNode();
	};

	/**
	 * public interface to gulp; triggers server restart
	 * @param  {event object} event typically a file change; 
	 */
	that.watch4Restart = function(event) {
		if (verbose) {
			gutil.log('watch4Restart ' + event.path + ' was ' + event.type);
		}
		restartServer();
	};

	/**
	 * public interface to gulp; trigger browser reload on changes of HTML/CSS/JS files
	 * @param  {event object} event triggered by gulp
	 * @return {none}       
	 */
	that.watch4Reload = function(event) {
		if (verbose) {
			gutil.log('watch4Reload ' + event.path + ' was ' + event.type);
		}
		reloadBrowser();
	};

	/**
	 * Reformat input data in UTF-8 into readable strings
	 * @param  {string} type is a message to separate different message types (err/std)
	 * @param  {utf-8} data input from streams
	 * @return {none} 
	 */
	function d2s(type, data) {
		var str = data.toString();
		var lines = str.split(/(\r?\n)/g);
		for (var i = 0; i < lines.length; ++i) {
			var trimmed = lines[i].trim();
			if (trimmed.length > 0) {
				gutil.log(type, trimmed);
			}
		};
	}

	/**
	 * private function; starts node as a new child process; 
	 * catches and displays messages from node
	 */
	function startNode() {
		gutil.log("Monitor: starting node");

		node = spawn('node', args);
		node.stdout.setEncoding('utf8');
		node.stderr.setEncoding('utf8');
		node.stdin.setEncoding('utf-8');

		node.stdout.on('data', function(data) {
			d2s("monitor", data);
		});

		node.stderr.on('data', function(data) {
			d2s("monitor err:", data);
		});

		// node.stdin.write("Hello from startNode\n");
	}


	/**
	 * kills and restarts node server
	 */
	function restartServer() {
		if (node !== null) {
			node.stdin.write("bye\n");
			node = null;
		} 
		// give shutdown a chance; otherwise we might get ADDRINUSE
		setTimeout(startNode, 1000);
	}

	/*
	
	 */
	
	/**
	 * communicate via standard IO with node
	 * send a "reload" to all connected browsers via socket.io
	 * @return {undefined} 
	 */
	function reloadBrowser() {
		if (node !== null) {
			node.stdin.write("reload\n");
		} 
	}

	return that;
}());