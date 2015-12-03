"use strict";

angular.module('socket.services', [])
.factory('socketService', function() {
	var URL = "http://ec2-54-69-23-151.us-west-2.compute.amazonaws.com:3000";
	//var URL = "http://localhost:3000";

	return {
		url: URL,	
		socket: null,
		connect: function(connectCb, disconnectCb, infoUpdateCb,
			newMessageCb) {
			this.socket = io.connect(URL + '/search');
			this.initSocket(connectCb, disconnectCb, infoUpdateCb,
				newMessageCb);
		},	
		initSocket: function(connectCb, disconnectCb, infoUpdateCb,
			newMessageCb) {
			this.socket.on('connect', function(categories) {
				console.log("DEBUG: Connected");
				invokeFunc(connectCb);
			});
			this.socket.on('disconnect', function() {
				console.log("DEBUG: Disconnected");
				invokeFunc(disconnectCb);
			});
			this.socket.on('info-update', function(infoUpdateArr) {
				console.log("DEBUG: New info incoming");
			//handleInfoUpdate(infoUpdateArr); change the 3 enum-like objects 
			invokeFunc(infoUpdateCb, infoUpdateArr);
		});
			this.socket.on('message', function(message) {
				console.log("DEBUG: New message incoming");
				invokeFunc(newMessageCb, message);
			});
		},
		on: function(eventName, callback) {
			this.socket.on(eventName, callback);
		},
		emit: function(eventName, data, callback) {
			this.socket.emit(eventName, data, callback);
		}
	}}); 

function invokeFunc(func, arg) {
	if (typeof func === "function")
		func(arg);
}