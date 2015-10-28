var Ingredient = require("../models/ingredient");

exports.addIngredient = function(req, res) {
    var name       =    req.body.name;
    var description =    req.body.description;
    if (typeof name === 'string') {
        name = name.toLowerCase();
    }
	Ingredient.addIngredient(name, description, function(err, ingredient){
		if (err) {
    		console.log("error creating ingredient: " + err);
    		res.status(400).send("Failed to create ingredient");
    	} else {
    		res.status(200).send(ingredient);
    	}
	});
}