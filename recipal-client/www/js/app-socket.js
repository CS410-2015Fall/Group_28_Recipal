"use strict"

var URL = "http://ec2-54-69-23-151.us-west-2.compute.amazonaws.com:3000";

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
		this.socket = io.connect(URL + '/search');
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

