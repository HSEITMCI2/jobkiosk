(function() {
	'use strict';
	// grab our packages
	var gulp = require('gulp');
	var debug = require('gulp-debug');
	var jshint = require('gulp-jshint');
	var jasmine = require('gulp-jasmine');
	var cache = require('gulp-cached');

	var monitor = require('./gulp_modules/monitor');

	monitor.init({
		args: ["app.js"]
	});

	// var pubjs = 'public/js/*.js';
	var specs = 'spec/*.js';

	var jsdirs = ['*.js', 'server_modules/*.js', 'public/js/*.js', 'server_modules/routes/*.js'];
	var serverfiles = ['app*.js', 'server_modules/*.js', 'server_modules/routes/*.js'];
	var clientfiles = ['public/**/*', 'spec/*.html', 'spec/*.js', 'views/*.jade'];


	// configure the jshint task
	gulp.task('jshint', function() {
		return gulp.src(jsdirs)
			.pipe(cache('linting'))
			.pipe(debug({
				title: 'js:'
			}))
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
	});

	gulp.task('servermonitor', function() {
		gulp.watch(serverfiles, monitor.watch4Restart);
	});

	gulp.task('browsermonitor', function() {
		gulp.watch(clientfiles, monitor.watch4Reload);
	});

	// Watch Files For Changes
	gulp.task('watch', function() {
		gulp.watch(jsdirs, ['jshint']);
	});


	// Watch Files For Changes
	gulp.task('testwatch', function() {
		gulp.watch(specs, ['jasmine']);
	});

	gulp.task('jasmine', function() {
		return gulp.src([specs])
			.pipe(cache('specs'))
			.pipe(debug({
				title: 'jasmine:'
			}))
			.pipe(jasmine({
				verbose: true
			}));
	});


	// Default Task
	gulp.task('default', ['jshint', 'watch', 'servermonitor', 'browsermonitor', 'testwatch']);

}());