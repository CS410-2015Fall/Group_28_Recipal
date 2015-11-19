"use strict"

var url = "http://ec2-54-69-23-151.us-west-2.compute.amazonaws.com:3000";

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
var socket = {
	socket: null,
	isConnected: false,
	connect: function(connectCb, disconnectCb, infoUpdateCb,
		newMessageCb) {
		if (this.isConnected) {
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
			socket.isConnected = true;
			invokeFunc(connectCb);
		});
		this.socket.on('disconnect', function() {
			console.log("Disconnected");
			socket.isConnected = false;
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
	createAccount: function(name, username, password, email, callback) {
		jQuery.post({url: url + '/createAccount', data: {name: name, username: username, password: password, email: email},
			success: function(data, txtStatus) {
				console.log("Receive createAccount success status: " + txtStatus);
				invokeFunc(callback, true, data);
			},
			error: function (data, txtStatus) {
				console.log("Receive createAccount error status: " + txtStatus);
				invokeFunc(callback, false);	
			}});
	},
	login: function(username, password, callback) {
		jQuery.post({url: url + '/login', data: {username: username, password: password}, 
			success: function(data, txtStatus) {
				console.log("Receive login success status: " + txtStatus);
				invokeFunc(callback, true, data);
			},
			error: function (data, txtStatus) {
				console.log("Receive login error status: " + txtStatus);
				invokeFunc(callback, false);	
			}});
	},
	on: function(eventName, callback) {
		if (!this.isConnected)
		{
			console.log("DEBUG: not connected");
			return;	
		}
		this.socket.on(eventName, callback);
	},
	emit: function(eventName, data, callback) {
		if (!this.isConnected)
		{
			console.log("DEBUG: not connected");
			return;	
		}
		this.socket.emit(eventName, data, callback);
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

