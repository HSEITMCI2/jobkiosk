/* global env, require, GLOBAL */

///////////////////////////////////////////////////////////////////////////////
// built-in module

'use strict';

var fs = require('fs');
var multer = require('multer');
var upload = multer({
	dest: 'userfiles/'
});

GLOBAL.searchpaths(module);

var logFuncs = require('log');
var moduleName = "JobRoutes]:";
var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
//var warningLog = logFuncs.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
var infoLog = logFuncs.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgYellow", 3);

module.exports = function(app, passport) {

	if (passport === undefined) {
		throw "passport undefined";
	}

	// route middleware to ensure user is logged in
	var userInterface = require('user_model')(); // access the singleton 
	var jobInterface = require('job_model')();
	var jobModel = jobInterface.jobModel;

	// var fileInterface = require('filehandler')();

	var authenticate = passport.authenticate('local-login');

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated() || env === 'development') {
			next();
			return;
		}
		next("Is not authenticated");
	}

	if (env === 'development') {
		app.post('/api/reset', function(req, res) {
			userInterface.clearDB();
			userInterface.addDefaulUser();

			jobInterface.clearDB();
			res.json({
				message: 'databases cleared!'
			});
		});
	}

	app.get('/api/profile', isLoggedIn, function(req, res) {
		if (req && req.user && req.user._id) {
			userInterface.findById(req.user._id, function(err, user) {
				if (err) {
					res.json({
						message: 'user not found!'
					});
				} else {
					user.password = undefined;
					res.json(user);
				}
			});
		} else {
			res.json({
				message: 'user not found!'
			});
		}
	});

	app.post('/api/profile', isLoggedIn, function(req, res) {
		if (req && req.user && req.user._id) {
			userInterface.updateUser(req.user._id, req.body, function(response) {
				res.json(response);
			});
		} else {
			res.json({
				message: 'user not found!'
			});
		}
	});

	// update a job (using put, because we know an ID)
	app.put('/api/job/:jobid', isLoggedIn, function(req, res) {
		jobModel.findById(req.params.jobid, function(err, job) {
			var jobobj = req.body;
			if (!err) {
				for(var i=0; i<jobInterface.fields.length; ++i) {
					var field = jobInterface.fields[i];
					job[field] = jobobj[field];
				}

				job.save(function(err) {
					var message = {};
					if (!err) {
						message.message = 'saved job';
					} else {
						message.message = 'error saving job';
					}
					res.json(message);
				});
			} else {
				errorLog('Could not find job' + req.params.jobid);
				res.json({
					message: 'Could not find job.'
				});
			}
		});
	});

	// update a job (using put, because we know an ID)
	app.delete('/api/job/:jobid', isLoggedIn, function(req, res) {
		jobModel.remove({
			_id: req.params.jobid
		}, function(err) {
			var message = {};
			if (!err) {
				message.type = 'notification!';
			} else {
				message.type = 'error';
			}
			res.json(message);
		});

	});

	app.get('/api/jobs', isLoggedIn, function(req, res) {
		dbgLog('multer', req.body.email);

		if (req.body && req.body.api && req.body.email) {
			dbgLog('Search user', req.body.email);
			userInterface.findByEmail(req.body.email, function(err, user) {
				if (err) {
					res.send({
						error: true
					});
					return
				} else {
					jobModel.find({
						creator: user._id
					}, function(err, jobs) {
						if (err) {
							errorLog('no jobs found!' + err);
							res.json({
								message: 'no jobs found!' + err
							});
						} else {
							res.json(jobs);
						}
					});
				}
			});
			return;
		}


		if (req && req.user && req.user._id) {
			jobModel.find({
				creator: req.user._id
			}, function(err, jobs) {
				if (err) {
					res.json({
						message: 'no jobs found!'
					});
				} else {
					res.json(jobs);
				}
			});
		} else {
			res.json({
				message: 'no jobs found!'
			});
		}
	});

	app.post('/api/job', isLoggedIn, upload.single('file'), function(req, res, next) {
		dbgLog('multer', req.body.email);
		dbgLog('multer', req.body.jobtitle);
		dbgLog('multer', req.file);

		// no session - every post sends credentials 
		if (req.body && req.body.api && req.body.email) {
			dbgLog('Search user', req.body.email);
			userInterface.findByEmail(req.body.email, function(err, user) {
				if (err) {
					res.send({
						error: true
					});
					return
				} else {
					jobInterface.addJob(user, req.file, req.body, function(saved) {
						res.send(saved);
					});
				}
			});
			return;
		}

		if (req && req.user && req.user._id) {
			jobInterface.addJob(req.user, req.file, req.body, function() {});
			res.redirect('back');
			return;
		}

		if (req.body.api) {
			res.send({
				error: true
			});
		} else {
			res.redirect('back');
		}
	});

	app.get('/api/dir', isLoggedIn, function(req, res) {
		res.json({
			dir: __dirname
		});
	});

	app.get('/api', isLoggedIn, function(req, res) {
		res.json({
			message: 'hooray! welcome to our api!'
		});
	});

};