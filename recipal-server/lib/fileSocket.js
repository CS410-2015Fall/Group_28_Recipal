var ss = require('socket.io-stream');
var fs = fs = require('fs');
var Path = require('path');

module.exports = function(io) {
	
	io.of('/input').on('connection', function(socket) {
		console.log("socket connected");
	});
}