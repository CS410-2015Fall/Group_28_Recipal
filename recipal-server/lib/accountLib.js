var Account = require("../models/account");
var Recipe = require("../models/recipe");

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
    		res.status(400).send("Account creation failed");
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
    				res.status(200).send(account[0]);
    			} else {
    				res.status(400).send("Incorrect credentials");
    			}
    		}
    	}
    }); 
}

// Bookmark

exports.bookmark = function(req, res) {
    console.log("Bookmark request");
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    Account.find({username: username, password: password}, function(err, account) {
        if (err) {
            console.log("error loggin in: " + err);
            res.status(400).send();
        } else {
            if (typeof(account) != "undefined" && account != null) {
                if (account.length === 1) {
                    res.status(200).send(account[0]);
                    Recipe.find({name: name}, function(err, recipe) {
                        if (err) {
                            console.log("error getting recipe for bookmark: " + err);
                            res.status(400).send();
                        } else {
                            console.log(JSON.stringify(recipe));
                            if (recipe.length === 1) {
                                account[0].bookmarks = addBookmark(account[0].bookmarks, recipe[0].name);
                                account[0].save();
                                res.status(200).send();
                            }
                        }
                    });
                } else {
                    res.status(400).send("Incorrect credentials");
                }
            }
        }
    }); 
}

exports.removeBookmark = function(req, res) {
    console.log("Bookmark request");
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    Account.find({username: username, password: password}, function(err, account) {
        if (err) {
            console.log("error loggin in: " + err);
            res.status(400).send();
        } else {
            if (typeof(account) != "undefined" && account != null) {
                if (account.length === 1) {
                    res.status(200).send(account[0]);
                    Recipe.find({name: name}, function(err, recipe) {
                        if (err) {
                            console.log("error getting recipe for removing bookmark: " + err);
                            res.status(400).send();
                        } else {
                            console.log(JSON.stringify(recipe));
                            if (recipe.length === 1) {
                                account[0].bookmarks = deleteBookmark(account[0].bookmarks, recipe[0].name);
                                account[0].save();
                                res.status(200).send();
                            }
                        }
                    });
                } else {
                    res.status(400).send("Incorrect credentials");
                }
            }
        }
    }); 
}

var addBookmark = function(bookmarks, name) {
    var results = bookmarks;
    if (!bookmarks || (typeof bookmarks === 'undefined')) {
        console.log("bookmarks is " + bookmarks + " and type is " + (typeof bookmarks));
        return [name];
    } else {
        var index = bookmarks.indexOf(name);
        if (index === -1) {
            results.push(name);
        }
        return results;
    }

}

var deleteBookmark = function(bookmarks, name) {
    var results = bookmarks;
    if (!bookmarks || (typeof bookmarks === 'undefined')) {
        console.log("bookmarks is " + bookmarks + " and type is " + (typeof bookmarks));
        return [];
    } else {
        var index = bookmarks.indexOf(name);
        if (index != -1) {
            results.splice(index, 1);
        }
        return results;
    }

}

