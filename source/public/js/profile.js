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
			'familyname': 'Mustermann',
			'givenname': 'Anna',
			'company': 'Test AG'
		});
	};

	return that;
}

window.addEventListener('load', function() {
	InitProfile().setup();
});

