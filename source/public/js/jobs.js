/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

"use strict";

function InitJobs() {


	var that = {};
	that.setup = function() {

		var jobcontrol = window.getElementById('jobcontrol');
		var jobsviewer = window.getElementById('jobsviewer');
		var addButton = window.getElementById('addjob');
		var saveButton = window.getElementById('savejob');

		saveButton.addEventListener('click', function(){
			
		});
		
		console.log('Jobs');
		http('get', '/api/profile');

		http('post', '/api/profile', {
			'familyname': 'Mustermann',
			'givenname': 'Anna',
			'company': 'Test AG'
		});
	};

	return that;
}

window.addEventListener('load', function() {
	InitJobs().setup();
});