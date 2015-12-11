"use strict";

function InitNewJobOffer() {

	var that = {};


	that.setup = function (inputData) {
		if(inputData) {
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
	};

	return that;
}

window.addEventListener('load', function() {

	var re = new RegExp("\\?id=([a-zA-Z0-9]+)&*");
	var currentId = null;
	if(window.location.href) {
		currentId = re.exec(window.location.href)[1];
	}

	if(currentId){
		getJobsFromDB(function(arraydata) {
			for (var i = 0; i < arraydata.length; i++) {
				var obj = arraydata[i];
				if( obj._id !== currentId ) {
					continue;
				}
				InitNewJobOffer().setup(obj);
			}
		});
	} else {
		InitNewJobOffer().setup();
	}
});

function getJobsFromDB(done) {
	http('get', '/api/jobs', {}, function(responseText) {
		var response = JSON.parse(responseText);
		done(response);
	});
}
