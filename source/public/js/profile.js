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
			'givenname': 'Sexy Anna',
			'company': 'KILL JAVASCRIPT AG',
			'department': 'WC',
			'telephone' : '0800123456',
			'street': 'langestr',
			'postcode': '666',
			'city': 'hell',
			'countrytxt' :'ka'


		});
	};

	return that;
}

window.addEventListener('load', function() {
	InitProfile().setup();
});

