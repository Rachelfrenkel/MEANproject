var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* User Schema
**/

var UserSchema = new Schema({
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	language: { type: String },
	school: { type: String },
});

// register the model
mongoose.model("User", UserSchema);
//var User = mongoose.model("User");

var fn = function(validation) {
	return validation;
};

// check for uniqueness of username 
UserSchema.path('name').validate(function(value, fn) {
	mongoose.model("User").find({name: value}, function(err, match) {
		console.log(match.length);
		if (match.length != 0) {
			fn(false);
		}
		fn(true);
	});
}, "Username already exits.");

/** 
* edit a user profile
*
exports.edit = function(req, res) {
	console.log('Allowing user to edit profile');
	var User = mongoose.model("User");
	mongoose.model("User").update({name: })
}*/
/**
 * Create a user
 */
exports.create = function(req, res) {
    console.log('Creating a new user');
    var User = mongoose.model("User");

    var user = new User(req.body);
    console.log(user);
    user.save(function(err) {
        if (err) {
            console.log('user creation failed');
            //res.status = 500;
            res.send(500);
        } else {
            console.log('user account was created!');
            req.session.username = user.name;
          //  res.redirect('/profile');
            res.jsonp(user);
        }
    });
};

exports.login = function(req, res) {
	console.log("login attempt made");
	var User = mongoose.model("User");
	var username = req.body.name;
	var userpassword = req.body.password;

	console.log('user = ' + username);
	console.log('pw = ' + userpassword);
	var newuser = new User(req.body);

	User.findOne({name: username, password: userpassword}, function(err, match) {
		if(match) {
			console.log("user and password match");
			//res.jsonp(newuser);
			req.session.username = req.body.name;
			//res.jsonp({username: req.body.name});
			res.send(req.body.name);
		}
		else {
			console.log("failed login");
			res.send(500);
		}
	});
};

exports.logout = function(req, res) {
	console.log("logging out from express side UserModel.js");
	if (req.session) {
		req.session.destroy(function(err) {
			if (err) {
				console.log("failed to destroy session.");
			} else {
				console.log("successfully destroyed session.");
			}
		});
	} else {
		console.log("No session exists... and yet you tried to logout.");
	}
};

// create secure json object where we don't show anything but usernames
function pullName(userObj) {
	return userObj.name;
};

exports.getAll = function(req, res) {
	console.log("Getting all users to display on home page.");
	var User = mongoose.model('User');
	if (req.session.username) {
		console.log("This is the username: "+ req.session.username);
		console.log("This is the current user: " + req.currentUser);

		// find all other users first
		User.find({name: {$ne: req.session.username}}, function test(err, users) {
			if (err) {
				throw(err);
			} else {
				// now find all other users
				var currentUser;
				User.findOne({name: req.session.username}, function(err, match) {
					if (match) {
						var otherNames = users.map(pullName);
						var allNames = {
							current: req.session.username,
							otherNames: otherNames
						};
						console.log("The allNames var: %j", allNames);
						
						res.jsonp(allNames);
					}  else {
						var otherNames = users.map(pullName);
						var allNames = {
							current: null,
							otherNames: otherNames
						};
						
						res.jsonp(allNames);
						console.log("Something terribly wrong, user session exists but cannot find user in db.");
					}
				});
			}
		});
	} else {
		User.find({}, function test(err, users) {
			if (err) {
				throw(err);
			} else {
				var otherNames = users.map(pullName);
				var allNames = {
					current: null,
					otherNames: otherNames
				};
				res.jsonp(allNames);
				return otherNames;
			}
		});
	}
};

