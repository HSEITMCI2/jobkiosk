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
	// Get the value of the input field with id="numb"
	result.givenname = document.getElementById("givenname").value;
	result.familyname = document.getElementById("familyname").value;
	result.email = document.getElementById("email").value;
	result.telephone = document.getElementById("telephone").value;
	result.department = document.getElementById("department").value;
	result.city = document.getElementById("city").value;
	result.postcode = document.getElementById("postcode").value;
	result.street = document.getElementById("street").value;
	result.company = document.getElementById("company").value;

	// If x is Not a Number or less than one or greater than 10
	return result;
}

function passCheck() {


		// JavaScript form validation

		var checkPassword = function (str) {
			var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
			return re.test(str);
		};

		var checkForm = function (e) {
			if (this.oldpw.value == "") {
				alert("Error: oldpw cannot be blank!");
				this.oldpw.focus();
				e.preventDefault(); // equivalent to return false
				return;
			}
			re = /^\w+$/;
			if (!re.test(this.oldpw.value)) {
				alert("Error: oldpw must contain only letters, numbers and underscores!");
				this.oldpw.focus();
				e.preventDefault();
				return;
			}
			if (this.pwd1.value != "" && this.pwd1.value == this.pwd2.value) {
				if (!checkPassword(this.pwd1.value)) {
					alert("The password you have entered is not valid!");
					this.pwd1.focus();
					e.preventDefault();
					return;
				}
			} else {
				alert("Error: Please check that you've entered and confirmed your password!");
				this.pwd1.focus();
				e.preventDefault();
				return;
			}
			alert("Both oldpw and password are VALID!");
		};

		var myForm = document.getElementById("myForm");
		myForm.addEventListener("submit", checkForm, true);

		// HTML5 form validation

		var supports_input_validity = function () {
			var i = document.createElement("input");
			return "setCustomValidity" in i;
		}

		if (supports_input_validity()) {
			var oldpwInput = document.getElementById("field_oldpw");
			oldpwInput.setCustomValidity(oldpwInput.title);

			var pwd1Input = document.getElementById("field_pwd1");
			pwd1Input.setCustomValidity(pwd1Input.title);

			var pwd2Input = document.getElementById("field_pwd2");

			// input key handlers

			oldpwInput.addEventListener("keyup", function () {
				oldpwInput.setCustomValidity(this.validity.patternMismatch ? oldpwInput.title : "");
			}, false);

			pwd1Input.addEventListener("keyup", function () {
				this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
				if (this.checkValidity()) {
					pwd2Input.pattern = this.value;
					pwd2Input.setCustomValidity(pwd2Input.title);
				} else {
					pwd2Input.pattern = this.pattern;
					pwd2Input.setCustomValidity("");
				}
			}, false);

			pwd2Input.addEventListener("keyup", function () {
				this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
			}, false);

		}


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



			var r = confirm("Are you sure?!");
			if (r == true) {
				http("post", "/api/profile", changeFunction());
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
	passCheck();
});
