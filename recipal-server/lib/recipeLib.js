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
    var author     =    req.body.author;
    var ingredients =   req.body.ingredients;
    var image = req.body.image;
    console.log(categories);
    if (typeof name === 'string') {
        name = name.toLowerCase();
    }
    for (var i = 0; i < categories.length; i++) {
        Categories.findOne({name: categories[i]}, function(err, category) {
            console.log("category for " + i + " is " + categories[i]);
            if (!category) {
                Categories.addCategory(categories[i], "", function(err, category) {
                    // Perhaps use Promises, but assuming server doesn't fail, this is not necessary
                });
            }
        });
    }
    for (var i = 0; i < ingredients.length; i++) {
        Ingredients.findOne({name: ingredients[i]}, function(err, ingredient) {
            console.log("ingredient for " + i + " is " + ingredients[i]);
            if (!ingredient) {
                Ingredients.addIngredient(ingredients[i], "", function(err, ingredient) {
                    // Perhaps use Promises, but assuming server doesn't fail, this is not necessary
                });
            }
        });
    }
    
    Recipe.addRecipe(name, duration, difficulty, {count: 0, rating: 0}, steps, ingredients, categories, author, image, function(err, recipe){
        if (err) {
            console.log("error creating recipe: " + err);
            res.status(400).send("error making your recipe D:");
        } else {
            res.status(200).send(recipe);
        }
    });
}

exports.rateRecipe = function(req, res) {
    var name     =    req.body.name;
    var rating   =    req.body.rating;
    Recipe.findOne({name:name}, function(err, recipe) {
        if (err) {
            console.log("error rating recipe");
            res.status(400).send("error rating recipe");
        } else {
            recipe.rating = changeRating(recipe.rating, rating);
            recipe.save();
            res.status(200).send("successful on rating recipe");
        }
    });
}

var changeRating = function(recipeRating, rating) {
    var count = recipeRating.count;
    var ratingTotal = count * recipeRating.rating;
    var newCount = count + 1;
    var newRating = (ratingTotal + rating) / newCount;
    return {count: newCount, rating: newRating};
}

exports.getRecipeAuthor = function(req, res) {
    var name = req.body.author;
    if (typeof name === 'undefined') {
        res.status(200).send({});
    }
    Recipe.find({accountRef:name}, function(err, recipes) {
        if (err) {
            console.log("error getting recipes for author " + err);
        } else {
            res.status(200).send(recipes);
        }
    })
}


exports.updateRecipe = function(req, res) {
    var oldName    =    req.body.oldName;
    var name       =    req.body.name;
    var duration   =    req.body.duration;
    var difficulty =    req.body.difficulty;
    var rating     =    req.body.rating;
    var steps      =    req.body.steps;
    var categories =    req.body.categories;
    var author     =    req.body.author;
    var ingredients =   req.body.ingredients;
    var image = req.body.image;
    
    Recipe.findOne({name:oldName}, function(err, recipe){
        if (err) {
            console.log("error creating recipe: " + err);
            res.status(400).send("error making your recipe D:");
        } else {
            if (recipe === undefined || recipe === null) {
                res.status(400).send();
                return;
            }
            recipe.name = name;
            recipe.duration = duration;
            recipe.difficulty = difficulty;
            recipe.rating = rating;
            recipe.steps = steps;
            recipe.categories = categories;
            recipe.author = author;
            recipe.ingredients = ingredients;
            recipe.image = image;
            recipe.save();
            res.status(200).send(recipe);
        }
    });
}

exports.deleteRecipe = function(req, res) {
    var name = req.body.name;
    Recipe.remove({name: name}, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send();
        }
    });
}