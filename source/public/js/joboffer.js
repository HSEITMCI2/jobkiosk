/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

// pseudo database
var mockdata = [{ jobTitle: 'myfirsttitle' }, { jobTitle: 'mysecondtitle' }, { jobTitle: 'mythirdtitle' }];




"use strict";




function InitJoboffer() {

	var that = {};

	that.setup = function (jobData) {
		for (var i = 0; i < jobData.length; i++) {

			var job = jobData[i];

			// create fields with dom
			var input = dom('input', { name: 'jobtitle', class: 'jobInput' }, '');
			var changeBtn = dom('button', { class: 'jobchangebtn' }, 'change');
			var deleteBtn = dom('button', { class: 'jobdeletebtn' }, 'delete');

			// change functionality
			changeBtn.jobId = job._id;
			changeBtn.addEventListener('click', function(e) {
				console.log(e.target.jobId);
				self.location = 'newjoboffer?id=' + e.target.jobId;
			});

			// delete job function
			deleteBtn.jobIndex = i;
			deleteBtn.addEventListener('click', function (e) {
				console.log(e.target.jobIndex);

				jobData.splice(e.target.jobIndex, 1);
				removeChildren(jobContent);
				that.setup(jobData);
			});

			// put everything into div
			var jobContainer = dom('div', {}, input, changeBtn, deleteBtn);

			// access jade / html id jobcontent
			input.value = job.jobtitle;
			var jobContent = document.getElementById("jobcontent");
			jobContent.appendChild(jobContainer);
		}
	};

	that.updateFromServer = function () {
		http('get', '/api/jobs', {}, function (responseText) {
			response = JSON.parse(responseText);
			that.setup(response);
		});
	};

	return that;
}

window.addEventListener('load', function () {
	InitJoboffer().updateFromServer();
});
