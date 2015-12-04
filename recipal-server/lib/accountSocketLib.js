var Account = require('../models/account');
var Recipe = require('../models/recipe');

module.exports = function(io) {

	io.of('/account').on('connection', function(socket) {
		console.log("Someone connected");
		// TODO: Establish user centric connections
		// Don't know what sorting is needed, need to implement in future
		// Event tag is used for both directions of communication

		// search based on name, or empty other wise
		// data contains: Name, Category, Rating, Difficulty, Ingredients(that user has), and authorName 
		// http://howtonode.org/promises
		socket.on("bookmarks", function(data) {
			var username = data.username;
			var password = data.password;
			Account.find({username: username, password: password}, function(err, account) {
				if (err) {
		    		console.log("error loggin in: " + err);
		    		socket.emit("bookmarks", []);
		    	} else {
		    		if (typeof(account) != "undefined" && account != null) {
		    			if (account.length === 1) {
		    				var bookmarks = account[0].bookmarks;
		    				Recipe.find({name:{ $in: bookmarks}}, function(err, recipes) {
		    					if (err) {
		    						socket.emit("bookmarks", []);
		    					} else {
		    						socket.emit("bookmarks", recipes);
		    					}
		    				});
		    			} else {
		    				socket.emit("bookmarks", []);
		    			}
		    		}
		    	}
			});

		});
	});
}