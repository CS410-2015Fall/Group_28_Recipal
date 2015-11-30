var Recipe = require("../models/recipe");
var Categories = require("../models/category");
var Ingredients = require("../models/ingredient");

exports.createRecipe = function(req, res) {
    var name       =    req.body.name;
    var duration   =    req.body.duration;
    var difficulty =    req.body.difficulty;
    var rating     =    req.body.rating;
    var steps      =    req.body.steps;
    var categories =    req.body.categories;
    var author     =    author;
    var ingredients =   req.body.ingredients;
    console.log(categories);
    if (typeof name === 'string') {
        name = name.toLowerCase();
    }
    for (var i = 0; i < categories.length; i++) {
        Categories.findOne({name: categories[i]}).exec(function(err, category) {
            console.log("category for " + i " is " + categories[i]);
            if (!category) {
                Categories.addCategory(categories[i], "", function(err, category) {
                    // Perhaps use Promises, but assuming server doesn't fail, this is not necessary
                });
            }
        });
    }
    for (var i = 0; i < ingredients.length; i++) {
        Ingredients.findOne({name: ingredients[i]}).exec(function(err, ingredient) {
            console.log("category for " + i " is " + ingredients[i]);
            if (!ingredient) {
                Ingredients.addIngredient(ingredients[i], "", function(err, ingredient) {
                    // Perhaps use Promises, but assuming server doesn't fail, this is not necessary
                });
            }
        });
    }
    
    Recipe.addRecipe(name, duration, difficulty, 0, steps, ingredients, categories, author, function(err, recipe){
        if (err) {
            console.log("error creating recipe: " + err);
            res.status(400).send("error making your recipe D:");
        } else {
            res.status(200).send(recipe);
        }
    });
}