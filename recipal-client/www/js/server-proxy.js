"use strict";
var url = "http://localhost:3000";

// TODO: Disconnect on switch task? Disable network components if not connected?
/*
connect(connectCb, disconnectCb, infoUpdateCb, newMessageCb) :
connectCb: invoked on connection success
disconnectCb: invoked whenever connection is interrupted
infoUpdateCb: invoked when saved information (recipe, profile, categories, etc)
	is outdated, passed in argument is the updated info array (InfoUpdate objects)
newMessageCb: invoked when there's any other notification from server,
	passed in argument is the message content (str)

searchRecipes(query, callback)
query: the Query object used to search for recipes
*/ 
var server = {
	socket: null,
	isConnected: false,
	connect: function(connectCb, disconnectCb, infoUpdateCb,
		newMessageCb) {
		if (server.isConnected) {
			invokeFunc(connectCb);
			return;
		}
		this.socket = io.connect(url + '/search');
		this.initSocket(connectCb, disconnectCb, infoUpdateCb,
		newMessageCb);
	},	
	initSocket: function(connectCb, disconnectCb, infoUpdateCb,
		newMessageCb) {
		this.socket.on('connect', function(categories) {
			console.log("Connected");
			server.isConnected = true;
			invokeFunc(connectCb);
		});
		this.socket.on('disconnect', function() {
			console.log("Disconnected");
			server.isConnected = false;
			invokeFunc(disconnectCb);
		});
		this.socket.on('info-update', function(infoUpdateArr) {
			console.log("New info incoming");
			//handleInfoUpdate(infoUpdateArr); change the 3 enum-like objects 
			invokeFunc(infoUpdateCb, infoUpdateArr);
		});
		this.socket.on('message', function(message) {
			console.log("New message incoming");
			invokeFunc(newMessageCb, message);
		});
	},
	searchRecipes: function(query, callback) {
		this.socket.emit('search',new Query(query.name, query.author, query.rating, 
			query.difficulty, query.ingredients, query.categories));

		this.socket.on('search', function(recipeArr) {
			console.log("Receive search results");
			invokeFunc(callback, recipeArr);
		});
	},
	createAccount: function(name, username, password, email, callback) {
		jQuery.post(url + '/createAccount', {name: name, username: username, password: password, email: email}, 
			function(response, txtStatus) {
				console.log("Receive createAccount response status: " + txtStatus);
				invokeFunc(callback, response);
			});
	},
	login: function(username, password, callback) {
		jQuery.post(url + '/login', {username: username, password: password}, 
			function(response, txtStatus) {
				console.log("Receive login response status: " + txtStatus);
				invokeFunc(callback, response);
			});
	}
};

function invokeFunc(func, arg1, arg2) {
	if (typeof func === "function" && func !== null)
		func(arg1, arg2);
}

// Check that id is a positive integer
function validateId(id) {
	if (typeof id === "number" && id % 1.0 == 0.0 && id > 0)
		return true;
	console.log("Invalid Id: " + id);
	return false;
}

// TODO: Do more checking here, essentially briefly checking everything in models.js,
// Plus query and resultHead check, even though the server should be checking
// extensively as well (stricter than client)
function validateRecipe(recipe) {
	return validateId(recipe.id) && validateId(recipe.authorId);
}

function validateAuthor(author) {
	return validateId(author.id);
}

function validateSearchCategories(categories) {
	return true;
}

function validateQuery(query) {
	return validateSearchCategories(query.categories);	
}

function validateResultHead(resultHead) {
	return validateId(resultHead.lastId) && validateQuery(resultHead.query);
}

