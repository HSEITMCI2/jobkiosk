"use strict";

var mockData = {
	jobtitle:'Entwickler',
	jobdescription: 'Entwickler entwickeln Entwicklungen',
	file: 'offer.pdf',
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
		// mocking setup function
		document.getElementById('jobtitle').value = inputData.jobtitle;
		document.getElementById('jobdescription').value = inputData.jobdescription;
		document.getElementById('file').value = inputData.file;
		document.getElementById('company').value = inputData.company;
		document.getElementById('startdate').value = inputData.startdate;
		document.getElementById('validdate').value = inputData.validdate;
		document.getElementById('duration').value = inputData.duration;
		document.getElementById('joblocation').value = inputData.joblocation;
		document.getElementById('jobtype').value = inputData.jobtype;
		document.getElementById('tags').value = inputData.tags.toString();
	}
}

window.addEventListener('load', function() {
	// mocking setup for testing purposes
	InitNewJobOffer().setup(mockData);
});
