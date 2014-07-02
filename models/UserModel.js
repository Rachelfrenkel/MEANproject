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
			res.send(200);
		}
		else {
			console.log("failed login");
			res.send(500);
		}
	});
};

