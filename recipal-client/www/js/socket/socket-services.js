"use strict";

angular.module('socket.services', [])
.factory('socketService', function() {
	var URL = "http://ec2-54-69-23-151.us-west-2.compute.amazonaws.com:3000";
	//var URL = "http://localhost:3000";
	var idCounter = 0;
	return {
		url: URL,
		sockets: [],
		connect: function(relPath, connectCb, disconnectCb, infoUpdateCb,
			newMessageCb) {
			console.log("Connecting to " + URL + relPath + " through socket " + idCounter);
			this.sockets["" + idCounter] = io.connect(URL + relPath);
			this.initSocket("" + idCounter, connectCb, disconnectCb, infoUpdateCb,
				newMessageCb);
			return "" + idCounter++;
		},	
		initSocket: function(id, connectCb, disconnectCb, infoUpdateCb,
			newMessageCb) {
			this.sockets[id].on('connect', function(categories) {
				console.log("DEBUG: Connected socket " + id);
				invokeFunc(connectCb);
			});
			this.sockets[id].on('disconnect', function() {
				console.log("DEBUG: Disconnected socket" + id);
				invokeFunc(disconnectCb);
			});
			this.sockets[id].on('info-update', function(infoUpdateArr) {
				console.log("DEBUG: New info incoming on socket " + id);
			//handleInfoUpdate(infoUpdateArr); change the 3 enum-like objects 
			invokeFunc(infoUpdateCb, infoUpdateArr);
			});

			this.sockets[id].on('message', function(message) {
				console.log("DEBUG: New message incoming on socket " + id);
				invokeFunc(newMessageCb, message);
			});
		},
		on: function(id, eventName, callback) {
			this.sockets[id].on(eventName, callback);
		},
		emit: function(id, eventName, data, callback) {
			this.sockets[id].emit(eventName, data, callback);
		}
	}}); 

function invokeFunc(func, arg) {
	if (typeof func === "function")
		func(arg);
}