var UserModel = require("../models/UserModel");
var mongoose = require('mongoose');

//-- middleware checks user is logged in before allowing access to profile page
function loadUser(req, res, next) {
	User = mongoose.model("User");
	if (req.session.user_id) {
		User.findById(req.session.user_id, function(user) {
			if (user) {
				req.currentUser = user;
				next();
			}
			else {
				res.redirect('/login');
			}
		});
	} else {
		res.redirect('/login'); // not sure if this will redirect relative to the url where request was issued
	}
}

module.exports = function(app) {
	/* GET home page. */
	app.route('/login')
		.get(function(req, res) {
			//res.send('<h1>This is the login page</h1>');
		})
		.post(UserModel.login);

	app.route('/')
		.get(function(req, res) {
		//res.send('<h1>This is the home page</h1>');
		});

	app.route('/createacc')
		.get(function(req, res) {
			console.log("on the create account page.");
			//res.send('<h1>This is the create account page</h1>');
		})
		.post(UserModel.create);

	app.route('/profile')
		.all(loadUser);
}


