"use strict";
// TODO: Disconnect on switch task? Disable network components if not connected?
/*
connect(connectCb, disconnectCb) :
connectCb: invoked on connection success
disconnectCb: is invoked whenever connection is interrupted

getCategories(cb) :
cb: invoked with the 
*/ 
var server = {
	socket: null,
	isConnected: false,
	connect: function(connectCb, disconnectCb) {
		if (server.isConnected) {
			invokeFunc(connectCb);
			return;
		}
		this.socket = io.connect('http://localhost:3000');
		this.initSocket(connectCb, disconnectCb);
	},	
	initSocket: function(connectCb, disconnectCb) {
		this.socket.on('connect', function(categories) {
			console.log("Connected");
			this.isConnected = true;
			invokeFunc(connectCb);
		});

		this.socket.on('disconnect', function() {
			console.log("Disconnected");
			this.isConnected = false;
			invokeFunc(disconnectCb);
		// 	socket.emit('my other event', { my: 'data' });
		});
	},
	getCategories: function(callback) {
		//this.socket
	}, 
	getRecipes: function(categories, maxNumResults, callback) {
		this.socket.emit('recipes', {categories: categories, 
			maxNumResults: maxNumResults});
		//this.socket.on('recipes',);
	}

};

function invokeFunc(func) {
	if (typeof func === "function" && func !== null)
		func();
}

function validateRecipe(recipe) {
	if (typeof recipe.id !== "number" 
		|| recipe.id <= 0 
		|| recipe.id % 1 != 0) 
		throw "Invalid Id";

	if (typeof recipe.authorId !== "number" 
		|| recipe.authorId <= 0 
		|| recipe.authorId % 1 != 0) 
		throw "Invalid Id";
}

function validateAuthor(author) {
	if (typeof author.id !== "number" 
		|| author.id <= 0 
		|| author.id % 1 != 0) 
		throw "Invalid Id";	
}


