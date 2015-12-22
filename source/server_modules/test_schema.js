/* global console, module */

"use strict";

var schema = {
	title: String,
	author: String,
	body: String,
	comments: [{
		body: String,
		date: Date
	}],
	date: {
		type: Date,
		default: Date.now
	},
	hidden: Boolean,
	meta: {
		votes: Number,
		favs: Number
	}
};
module.exports.schema = schema;