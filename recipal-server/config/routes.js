/**
 * routes.js
 */
var path = require('path');
var accountLib = require('../lib/accountLib');
var recipeLib = require('../lib/recipeLib');
var ingredientLib = require('../lib/ingredientLib');
var categoryLib = require('../lib/categoryLib');


module.exports = function(app, log) {
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	// login done using http request for security reasons
	app.post("/createAccount", accountLib.createAccount);
	app.post("/login", accountLib.login);
	app.post("/createRecipe", recipeLib.createRecipe);
	app.post("/addIngredient", ingredientLib.addIngredient);
	app.post("/addCategory", categoryLib.addCategory);
	app.post("/addBookmark", accountLib.bookmark);
	app.post("/rateRecipe", recipeLib.rateRecipe);
	app.post("/removeBookmark", accountLib.removeBookmark);

};
