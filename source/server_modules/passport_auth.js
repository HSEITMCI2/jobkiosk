// https://github.com/scotch-io/easy-node-authentication/blob/master/config/passport.js
// load all the things we need

'use strict';
GLOBAL.searchpaths(module);

var logFuncs = require('log');
var moduleName = "Passport]:";
var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = logFuncs.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = logFuncs.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgYellow", 3);

var LocalStrategy = require('passport-local').Strategy;
var userInterface = require('user_model')();

module.exports = function(passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		userInterface.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			userInterface.login(email, password, function(obj) {
				if (obj.error) {
					errorLog('Cannot login', email, obj.message);
					done(null, false, {
						message: obj.message
					});
				} else {
					dbgLog('login', email);
					done(null, obj.user);
				}
			});
		}));

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			dbgLog('signup', email);
			userInterface.addUser(email, password, function(obj) {
				if (obj.error) {
					done(null, false, {
						message: obj.message
					});
				} else {
					done(null, obj.user);
				}
			});
		}));
};