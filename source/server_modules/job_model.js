// load the things we need
var mongoose = require('mongoose');
var fs = require('fs');


GLOBAL.searchpaths(module);
var log = require('log');

var moduleName = "jobs]:";
var errorLog = log.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = log.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = log.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = log.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);


function Jobs() {
	"use strict";
	var that = {};
	var mongooseDB = require('db_connection')();
	var fileInterface = require('filehandler')();

	var jobSchema = new mongoose.Schema({
		jobtitle: String,
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		tags: [{
			tag: String,
		}],
		date: {
			type: Date,
			default: Date.now
		},
		fullimage: String,
		smallimage: String
	});

	var jobModel = mongooseDB.model('Jobs', jobSchema);
	that.jobModel = jobModel;

	that.clearDB = function() {
		that.jobModel.remove({}, function() {
			console.log('collection removed');
		});
	};


	that.addJob = function(user, file, jobtitle, cb) {
		var job = {};
		job.jobtitle = jobtitle;
		job.creator = user._id;
		var targetfilepath = fileInterface.addFile(user.email, file.originalname);
		job.fullimage = fileInterface.PDF2PNGname(targetfilepath, 300);
		job.smallimage = fileInterface.PDF2PNGname(targetfilepath, 72);

		var jobdoc = new jobModel(job);
		jobdoc.save(function(err, job) {
			if (err) {
				cb({error: err});
			} else {
				cb(job);
			}
		});

		dbgLog('Add user  ', user.email);
		fileInterface.addUserDir(user.email, function(err) {
			if (!err) {
				dbgLog('Copy to ', targetfilepath);
				fileInterface.copyFile(file.path, targetfilepath, function(err) {
					if (!err) {
						fileInterface.PDF2PNG(targetfilepath, 300);
						fileInterface.PDF2PNG(targetfilepath, 72);
					} else {
						errorLog('Error in copyFile', err);
					}
					fs.unlink(file.path, function(err) {
						if (err) {
							errorLog('Error deleting tmp file', file.path, err);
						}
					}); // delete the temporary file
				});
			} else {
				errorLog('Error in addUserDir', err);
			}
		});
	}


	return that;
}

function JobsInterface() {
	"use strict";
	var singleton = null;

	return function() {
		if (singleton === null) {
			singleton = Jobs();
		}
		return singleton;
	};
}


module.exports = JobsInterface();