///////////////////////////////////////////////////////////////////////////////
// built-in module

'use strict';

GLOBAL.searchpaths(module);

var logFuncs = require('log');
var moduleName = "User Routes]:";
// var errorLog = logFuncs.xlog("[Error in " + moduleName, "FgWhite", "BgRed", 0);
// var warningLog = logFuncs.xlog("[Warning " + moduleName, "FgRed", "BgWhite", 1);
// var infoLog = logFuncs.xlog("[Info in " + moduleName, "FgGreen", "BgBlack", 2);
var dbgLog = logFuncs.xlog("[Debug " + moduleName, "FgBlue", "BgWhite", 3);

var para = {};
para.title = 'Home';

// Links in key/value form
// key is the route; value is the title
var insideLinks = {
	'/home': {
		title: 'Home',
		view: 'home'
	},
	'/logout': {
		title: 'Logout',
		view: 'logout',
		func: function(req, res) {
			para.links = outsideLinks;
			req.logout();
			res.redirect('/');
		}
	},
	'/profile': {
		title: 'Profile',
		view: 'profile'
	},
	'/jobs': {
		title: 'Jobs',
		view: 'jobs'
	},
	'/create': {
		title: 'Create New Job',
		view: 'create'
	},
	'/assistant': {
		title: 'Assistant',
		view: 'adminassist'
	},
	'/SpecRunner.html': {
		title: 'Test',
		view: undefined
	},
	'/statistics': {
		title: 'Statistics',
		view: 'statistics'
	},
};

var outsideLinks = {
	'/': {
		title: 'Home',
		view: 'home'
	},
	'/viewer': {
		title: 'View all Jobs',
		view: 'viewer'
	},
	'/login': {
		title: 'Login',
		view: 'login'
	},
	'/signup': {
		title: 'Sign up',
		view: 'signup'
	}
};

para.links = outsideLinks;
para.message = "Test";

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.session && req.session.auth) {
		return next();
	}
	res.redirect('/');
}

module.exports = function(app, passport) {

	// var userInterface = require('user_model')(); // access the singleton 

	app.use(function(req, res, next) {
		var sess = req.session;
		sess.auth = false;

		if (req.isAuthenticated()) {
			sess.auth = true;
			para.user = req.user;
			para.auth = "Authenticated";
			para.links = insideLinks;
		} else {
			para.message = req.flash('error')[0] || "";
			para.auth = "Not Authenticated";
			para.links = outsideLinks;
			para.user = undefined;
		}

		para.url = req.url; // used in layout.jade to determine the active menu

		next(); // do not stop here
	});

	// normal routes ===============================================================
	function setRoutes(links, setfunc) {
		for (var route in links) {
			if (links.hasOwnProperty(route)) {
				var target = links[route];
				if (target && target.view) {
					setfunc(route, target);
				}
			}
		}
	}

	setRoutes(insideLinks, function(route, target) {
		para.title = target.title;
		if (target.func) {
			app.get(route, isLoggedIn, target.func);
		} else {
			app.get(route, isLoggedIn, function(req, res) {
				res.render(target.view, para);
			});
		}
	});

	setRoutes(outsideLinks, function(route, target) {
		para.title = target.title;
		dbgLog('Route outsideLinks', route, target.view);
		app.get(route, function(req, res) {
			res.render(target.view, para);
		});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

};