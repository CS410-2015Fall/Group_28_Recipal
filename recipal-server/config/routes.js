/**
 * routes.js
 */
var path = require('path');
var accountLib = require('../lib/accountLib');
var recipeLib = require('../lib/recipeLib');
var ingredientLib = require('../lib/ingredientLib');
var categoryLib = require('../lib/categoryLib');

module.exports = function(app, log) {
	// login done using http request for security reasons
	app.post("/createAccount", accountLib.createAccount);
	app.post("/login", accountLib.login);
	app.post("/createRecipe", recipeLib.createRecipe);
	app.post("/addIngredient", ingredientLib.addIngredient);
	app.post("/addCategory", categoryLib.addCategory);
};