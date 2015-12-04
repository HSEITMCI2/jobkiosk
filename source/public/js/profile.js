/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

"use strict";

function InitProfile() {

	var that = {};
	that.setup = function() {
		console.log('Profile');
		http('get', '/api/profile');

		http('post', '/api/profile', {
			'familyname': 'Anna',
			'givenname': 'Sexy',
			'company': 'KILL JAVASCRIPT AG',
			'department': 'WC',
			'telephone' : 'its a phone nr im serius',
			'street': 'langestr',
			'postcode': '666',
			'city': 'hell',
			'countrytxt' :'ka'

		});

		var changeBtn = dom('button', { class: 'jobdeletebtn' }, 'SUBMIT');

		var jobContainer = dom('div', { class: 'rowborder', style: 'justify-content:center;' }, changeBtn);

		// delete job function
		changeBtn.addEventListener('click', function (e) {
			console.log(e.target.jobIndex);

			var r = confirm("Are you sure?!");
			if (r == true) {
				// do nothing
			} else {
				// do nothing
			}

		});

		var jobContent = document.getElementById("submitthis");
		jobContent.appendChild(jobContainer);

	};



	return that;
}

window.addEventListener('load', function() {
	InitProfile().setup();
});
