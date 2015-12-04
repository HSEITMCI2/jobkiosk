"use strict";

var mockData = {
	jobtitle:'Entwickler',
	jobdescription: 'Entwickler entwickeln Entwicklungen',
	company: 'Deutschland GmbH',
	startdate: new Date("2015-12-01"),
	validdate: new Date("2015-12-31"),
	duration: "6 Monate",
	joblocation: 'Stuttgart',
	jobtype: 'Vollzeit',
	tags:[
		'c++',
		'c',
		'python'
	]
};

function InitNewJobOffer() {

	var that = {};


	that.setup = function (inputData) {
		document.getElementById('jobtitle').value = inputData.jobtitle;
		document.getElementById('jobdescription').value = inputData.jobdescription;
		document.getElementById('company').value = inputData.company;
		document.getElementById('startdate').value = inputData.startdate;
		document.getElementById('validdate').value = inputData.validdate;
		document.getElementById('duration').value = inputData.duration;
		document.getElementById('joblocation').value = inputData.joblocation;
		document.getElementById('jobtype').value = inputData.jobtype;
		document.getElementById('tags').value = inputData.tags.toString();
	}

	return that;
}

window.addEventListener('load', function() {
	// mocking setup for testing purposes
	// InitNewJobOffer().setup(mockData);

	var re = new RegExp("\?id=([a-zA-Z0-9]+)&*")
	var currentId = re.exec(window.location.href)[1];

	getJobsFromDB(function(arraydata) {
		for (var i = 0; i < arraydata.length; i++) {
			var obj = arraydata[i];
			if( obj._id != currentId ) {
				continue;
			}
			InitNewJobOffer().setup(obj);
		}
	}
});

function getJobsFromDB(done) {
	http('get', '/api/jobs', {}, function(responseText) {
		response = JSON.parse(responseText);
		done(response);
	});
}
