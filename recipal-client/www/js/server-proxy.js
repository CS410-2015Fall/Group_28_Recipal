"use strict";
// TODO: Disconnect on switch task? Disable network components if not connected?
/*
connect(connectCb, disconnectCb) :
connectCb: invoked on connection success
disconnectCb: invoked whenever connection is interrupted
infoUpdateCb: invoked when saved information (recipe, profile, categories, etc)
	is outdated, passed in argument is the updated info array (InfoUpdate objects)
newMessageCb: invoked when there's any other notification from server,
	passed in argument is the message content (str)

getRecipes(query)
query: the Query object used to search for recipes

nextResults(resultHead)
repeat the search query stored in resultHead, but advance past lastId,
	calling the same callback in resultHead when results are returned
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
		this.socket = io.connect('http://ec2-54-69-23-151.us-west-2.compute.amazonaws.com:3000');
		this.initSocket(connectCb, disconnectCb, infoUpdateCb,
		newMessageCb);
	},	
	initSocket: function(connectCb, disconnectCb, infoUpdateCb,
		newMessageCb) {
		this.socket.on('connect', function(categories) {
			console.log("Connected");
			this.isConnected = true;
			invokeFunc(connectCb);

			console.log(this.searchRecipes);

			console.log(typeof this.searchRecipes);
			this.searchRecipes(null, null);
		});
		this.socket.on('disconnect', function() {
			console.log("Disconnected");
			this.isConnected = false;
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
		// this.socket.on('recipe-list', function(recipeArr, resultHead) {
		// 	console.log("Receiving recipe list");
		// 	invokeFunc(resultHead.callback, recipeArr, resultHead);
		// });
	},
	searchRecipes: function(query, callback) {
		console.log("send search");
		this.socket.to('search').emit('search', query);


			console.log(this.socket.to);

			console.log(typeof this.socket.to);
			this.searchRecipes(null, null);

		this.socket.on('search', function(recipeArr) {
			console.log("Receiving search results");
			invokeFunc(recipeArr, callback);
		});
	}
	// nextResults: function(resultHead) {
	// 	console.log("send next-results");
	// 	this.socket.emit('next-results', resultHead);
	// }
};

// TODO: a better way to combine these 3?
function invokeFunc(func) {
	if (typeof func === "function" && func !== null)
		func();
}

function invokeFunc(func, arg1) {
	if (typeof func === "function" && func !== null)
		func(arg1);
}

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

