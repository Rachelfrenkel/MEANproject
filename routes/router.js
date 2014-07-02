var UserModel = require("../models/UserModel");
var mongoose = require('mongoose');

//-- middleware checks user is logged in before allowing access to profile page
function loadUser(req, res, next) {
	User = mongoose.model("User");
	console.log('request username = ' + req.session.username); // this is currently UNDEFINED FIX THIS

	if (req.session.username) {
		console.log('hi one');
		User.find({name: req.session.username}, function(err, match) {
			if (match) {
				console.log("hi two");
				req.currentUser = match;
				console.log("loading user after assignment to request: " + req.currentUser);
				next();
			}
			if (err) {
				console.log('error finding the session user!');
				res.redirect('/login');
			}
		});
	} else {
		console.log("apparently req.session.username is false..");
		res.redirect('/login'); // not sure if this will redirect relative to the url where request was issued
	}
}

module.exports = function(app) {
	/* GET home page. */
	app.route('/login')
		.get(function(req, res) {
			
		})
		.post(UserModel.login);

	app.route('/')
		.get(function(req, res) {
		//res.send('<h1>This is the home page</h1>');
		});

	app.route('/createacc')
		.get(function(req, res) {
			// destroy the previous session
			console.log("on the create account page.");
			//res.send('<h1>This is the create account page</h1>');
		})
		.post(UserModel.create);

	app.route('/profile')
		.all(loadUser)
		.get(function(req, res) {
			console.log("the current user obj from calling get on profile: " + req.currentUser);
			res.send({user: req.currentUser});
		});

	app.route('/logout')
		.get(function(req, res) {
			console.log("logging out");
			if (req.session) {
				req.session.destroy(function(err) {
					console.log("failed to destroy session.");
				});
			} else {
				console.log("No session exists...");
			}
		});
}


