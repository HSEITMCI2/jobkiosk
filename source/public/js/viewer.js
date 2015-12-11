/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

"use strict";

function InitViewer() {

	var jobs = [];
	var container;
	var images = [];
	var imgidx = 0;

	function prepareImages(jobs) {
		for (var i = jobs.length - 1; i >= 0; i--) {
			var job = jobs[i];
			console.log(job.jobtitle);

			var img = dom('img', {
				src: job.smallimage
			});

			var div = dom('div', {}, img);
			images.push(div);
			container.appendChild(div);
		};
		setInterval(toggle, 1000);
	}

	function toggle() {
		++imgidx;
		if (imgidx >= images.length) {
			imgidx = 0;
		}
		console.log('Image', imgidx);
		for (var i = 0; i < images.length; ++i) {
			images[i].style.display = 'none';
		}
		images[imgidx].style.display = 'block';

	}

	function onJobs(resp) {
		if (resp.message === undefined) {
			jobs = JSON.parse(resp);
			console.log(resp.length);
			if (isArray(jobs)) {
				prepareImages(jobs);
			}
		}
	}

	var that = {};
	that.setup = function() {
		images = [];
		container = document.getElementById('images');
		http('get', '/api/alljobs', {}, onJobs);
	};

	return that;
}

window.addEventListener('load', function() {
	InitViewer().setup();
});