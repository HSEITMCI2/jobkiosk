/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

"use strict";

function changeFunction() {
	var familyname, givenname, company, department, telephone, street, postcode, city, countrytxt;
	var result = {};

	result.givenname = document.getElementById("givenname").value;
	result.familyname = document.getElementById("familyname").value;
	result.email = document.getElementById("email").value;
	result.telephone = document.getElementById("telephone").value;
	result.department = document.getElementById("department").value;
	result.city = document.getElementById("city").value;
	result.postcode = document.getElementById("postcode").value;
	result.street = document.getElementById("street").value;
	result.company = document.getElementById("company").value;

	var pass2 = document.getElementById('field_pwd2');
	result.password = pass2.value;

	return result;
}

function passCheck() {

	//Store the password field objects into variables ...
	var pass1 = document.getElementById('field_pwd1');
	var pass2 = document.getElementById('field_pwd2');

	//Set the colors we will be using ...
	var goodColor = "#66cc66";
	var badColor = "#ff6666";
	//Compare the values in the password field and the confirmation field
	if (pass1.value != "" && pass1.value == pass2.value) {
		//The passwords match.
		//Set the color to the good color
		// true
		pass2.style.borderColor = goodColor;
		return true;
	}
	if (pass1.value != "" && pass1.value != pass2.value) {
		//The passwords match.
		//Set the color to the good color
		// false
		pass2.style.borderColor = badColor;
		return false;
	}
	//Password not changed
	return true;
}

function InitProfile() {

	var that = {};
	that.setup = function () {
		console.log('Profile');
		http('get', '/api/profile');

		//http('post', '/api/profile', {
		//	'familyname': 'Anna',
		//	'givenname': 'Sexy',
		//	'company': 'KILL JAVASCRIPT AG',
		//	'department': 'WC',
		//	'telephone' : 'its a phone nr im serius',
		//	'street': 'langestr',
		//	'postcode': '666',
		//	'city': 'hell',
		//	'countrytxt' :'ka'
		//});

		var changeBtn = dom('button', { class: 'jobdeletebtn', type: 'submit' }, 'SUBMIT');

		var jobContainer = dom('div', { class: 'rowborder', style: 'justify-content:center;' }, changeBtn);

		// change profile function
		changeBtn.addEventListener('click', function (e) {
			console.log(e.target.jobIndex);
			passCheck();

			var secondpw = document.getElementById('field_pwd2');
			var badColor = "#ff6666";






			var r = confirm("Are you sure?!");
			if (r == true) {
				if (passCheck()) {
					http("post", "/api/profile", changeFunction());
				}
			} else {
				// do nothing
			}

		});


		var jobContent = document.getElementById("submitthis");
		jobContent.appendChild(jobContainer);

	};



	return that;
}

window.addEventListener('load', function () {
	InitProfile().setup();

});
