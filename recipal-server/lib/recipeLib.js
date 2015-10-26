var Recipe = require("../models/recipe");

exports.createRecipe = function(req, res) {
    var name       =    req.body.name;
    var duration   =    req.body.duration;
    var difficulty =    req.body.difficulty;
    var rating     =    req.body.rating;
    var steps      =    req.body.steps;
    var categories =    req.body.categories;
    var accountRef =    req.body.accountRef;
	Recipe.addRecipe(name, duration, difficulty, rating, steps, categories, accountRef, function(err, recipe){
		if (err) {
    		console.log("error creating recipe: " + err);
    		res.status(400).send();
    	} else {
    		res.status(200).send(recipe);
    	}
	});
}