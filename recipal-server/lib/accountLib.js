var Account = require("../models/account");

// create Account
// Again, using http request
// TODO: make it more secure

exports.createAccount = function(req, res) {
    console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	var name 	 = req.body.name;
    var email    = req.body.email;
	var age		 = req.body.age;
	var gender 	 = req.body.gender;
	Account.addAccount(username, password, name, email, gender, age, 0, function(err, account){
		if (err) {
    		console.log("error creating user: " + err);
    		res.status(400).send();
    	} else {
    		res.status(200).send(account);
    	}
	});
}


// Basic login for now
// TODO: replace with passport.js

exports.login = function(req, res) {
    console.log("login request");
	var username = req.body.username;
	var password = req.body.password;
    Account.find({username: username, password: password}, function(err, account) {
    	if (err) {
    		console.log("error loggin in: " + err);
    		res.status(400).send();
    	} else {
    		if (typeof(account) != "undefined" && account != null) {
    			if (account.length === 1) {
    				res.status(200).send("Successful login");
    			} else {
    				res.status(400).send("Incorrect credentials");
    			}
    		}
    	}
    }); 
}