var UserModel = require("../models/UserModel");
var mongoose = require('mongoose');

//-- middleware checks user is logged in before allowing access to profile page
function loadUser(req, res, next) {
	User = mongoose.model("User");
	console.log('request username = ' + req.session.username); // this is currently UNDEFINED FIX THIS

	if (req.session.username) {
		User.find({name: req.session.username}, function(err, match) {
			if (match) {
				req.currentUser = match;
				console.log("loading user after assignment to request: " + req.currentUser);
				next();
			}
			if (err) {
				console.log('error finding the session user!');
				res.redirect('/home');
			}
		});
	} else {
		console.log("apparently req.session.username is false..");
		res.redirect('/home'); // not sure if this will redirect relative to the url where request was issued
	}
}

module.exports = function(app) {
	
	/* GET home page. */
	app.route('/login')
		.get(function(req, res) {
			res.sendfile('./public/index.html');
		})
		.post(UserModel.login);

	app.route('/')
		.get(UserModel.getAll);

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
			res.jsonp(req.currentUser);
			res.sendfile("./public/index.html");
		});

	app.route('/logout')
		.get(function(req, res) {
			UserModel.logout(req, res);
			res.sendfile("./public/index.html");
		});

	app.route('/home')
		.get(UserModel.getAll);

	app.route('*')
		.get(function(req, res) {
			console.log('called here');
			// console.log('CSRF request csrfTokenn = ' + req.csrfToken());
			res.sendfile('./public/index.html'); // load our public/index.html file
		});

	app.route('/admin')
		.get(function(res, req) {
			res.sendfile("./public/index.html");
		})

}


