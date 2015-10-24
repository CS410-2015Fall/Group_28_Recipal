/**
 * routes.js
 */
var path = require('path');
var accountLib = require('../lib/accountLib');

module.exports = function(app, log) {
	// login done using http request for security reasons
	app.post("/createAccount", accountLib.createAccount);
	app.post("/login", accountLib.login);
};