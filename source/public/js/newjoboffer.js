"use strict";

function InitNewJobOffer() {

	var that = {};

	that.setup = function () {
		// create fields for job offers
		var title = dom('input', {name: 'jobtitle', class: 'jobInput'}, '');
		var description = dom('input', {name: 'jobDescription', class: 'jobInput'}, '');
		var fileupload = dom('input', {name: 'fileUpload', class: 'jobInput'}, '');
		var uploadButton = dom('button', {class: 'uploadButton'}, 'upload');
		var begin = dom('input', {name: 'jobBegin', class: 'jobInput'}, '');
		var duration = dom('input', {name: 'jobDuration', class: 'jobInput'});
		var jobLocation = dom('input', {name: 'jobLocation', class: 'jobInput'});
		var tags = dom('input', {name: 'tags', class: 'jobInput'});
		var createButton = dom('button', {class: 'uploadButton'}, 'upload');

		// store everything in div
		var newJobContainer = dom('div', {}, title, description, fileupload, uploadButton, begin, duration, jobLocation, tags, createButton);

		// create job
		
	}
}
