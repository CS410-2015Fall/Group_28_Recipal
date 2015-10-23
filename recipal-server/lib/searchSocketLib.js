var ss = require('socket.io-stream');
var fs = fs = require('fs');
var Path = require('path');
var Recipe = require('../models/recipe');
var Category = require('../models/recipe');
var Ingredient = require('../models/recipe');
var Account = require('../models/account');
var Q = require('q');

// Helpers
Array.prototype.contains = function(k) {
  	for(var i=0; i < this.length; i++){
    	if (this[i] === k) {
      		return true;
    	}
  	}
  	return false;
}

var checkIfOneTrue = function(array) {
	if (array.length === 0) {
		return false
	} else {
		var result = false;
		for (var i = 0; i < array.length; i++) {
			result = result || array[i];
		}
		return result;
	}
}

var checkIfAllTrue = function(array) {
	if (array.length === 0) {
		return false
	} else {
		var result = true;
		for (var i = 0; i < array.length; i++) {
			result = result && array[i];
		}
		return result;
	}
}


var difficultyCheck = function(min, max, difficulty) {
	if ((difficulty <= max) && (difficulty >= min)) {
		return true;
	}
}

var ratingCheck = function(min, max, rating) {
	if ((rating <= max) && (rating >= min)) {
		return true;
	}
}

var filterCategory = function(categories, recipes, done) {
	var result = {};
	var errHandler = function(err) {
		console.log("Error searching category in DB: " + err);
	};
	if (categories) {
		if (categories.length && recipes) {
			var categoryPromiss = {};
			var listOfCategories = {};
			for (var i = 0; i < categories.length; i++) {
				categoryPromiss[i] = Category.findOne({name: categories[i]}, null, null).then(function(category) {
					listOfCategories[i] = category._id;
				}, errHandler);
			}
			Q.all(categoryPromiss).then(function() {
				if (recipes.length) {
					for (var j = 0; j<recipes.length; j++) {
						var success = {};
						success = listOfCategories.map(recipe[j].categories.contains);
						if (checkIfOneTrue(success)) {
							result.push(recipes[j]);
						}
					}
				} else {
					done(recipes);
					return;
				}
			}, errHandler);
		} else {
			console.log("wrong category format");
		}
	} else {
		console.log("no categories");
		done(recipes);
		return;
	}
	done(result);
}

var filterRating = function (range, recipes, done) {
	var max = 0;
	var min = 0;
	if (range) 
		if (!isNan(range.max) && !isNan(range.min)) {
			validRating = true;
			max = range.max;
			min = range.min;
		}
	var result = {};
	if (recipes.length >= 0 && validRating) {
		for (var i = 0; i < recipes.length; i++) {
			if ((recipes[i].rating <= max) && (recipes[i].rating >= min)) {
				result.push(recipes[i]);
			}
		}
	} else {
		done(recipes);
		return;
	}
	done(result);
}

var filterDifficulty = function (range, recipes, done) {
	var max = 0;
	var min = 0;
	if (range) 
		if (!isNan(range.max) && !isNan(range.min)) {
			validDifficulty = true;
			max = range.max;
			min = range.min;
		}
	var result = {};
	if (recipes.length >= 0 && validDifficulty) {
		for (var i = 0; i < recipes.length; i++) {
			if ((recipes[i].difficulty <= max) && (recipes[i].difficulty >= min)) {
				result.push(recipes[i]);
			}
		}
	} else {
		done(recipes);
		return;
	}
	done(result);
}

filterIngredients = function(ingredients, recipes, done) {
	var result = {};
	var errHandler = function(err) {
		console.log("Error searching ingredients in DB: " + err);
	};
	if (ingredients) {
		if (ingredients.length && recipes) {
			var ingredientPromiss = {};
			var listOfIngredients = {};
			for (var i = 0; i < Ingredients.length; i++) {
				ingredientPromiss[i] = Ingredient.findOne({name: ingredients[i]}, null, null).then(function(ingredientPromiss) {
					listOfIngredients[i] = ingredient._id;
				}, errHandler);
			}
			Q.all(ingredientPromiss).then(function() {
				if (recipes.length) {
					for (var j = 0; j<recipes.length; j++) {
						var success = {};
						success = recipe[j].ingredients.map(listOfIngredients.contains);
						if (checkIfOneTrue(success)) {
							result.push(recipes[j]);
						}
					}
				} else {
					done(recipes);
					return;
				}
			}, errHandler);
		} else {
			console.log("wrong ingredients format");
		}
	} else {
		console.log("no ingredients");
		done(recipes);
		return;
	}
	done(result);
}

var filterAuthor = function(author, recipes, done) {
	var result = {};
	if (author) {
		Account.findOne({name: author}, null, null, function(err, authorObject) {
			if (err) {
				console.log("Error searching for author " + err);
			} else {
				for (var i = 0; i < recipes.length; i++) {
					if (recipes[i].author.contains(authorObject._id)) {
						result.push(recipes[i]);
					}
				}
			}
		});
	} else {
		done(recipes);
		return;
	}
	done(recipes);
}


module.exports = function(io) {
	
	io.of('/search').on('connection', function(socket) {
		// TODO: Establish user centric connections
		// Don't know what sorting is needed, need to implement in future
		// Event tag is used for both directions of communication

		// search based on name, or empty other wise
		// data contains: Name, Category, Rating, Difficulty, Ingredients(that user has), and authorName 
		// http://howtonode.org/promises
		socket.on("search", function(data) {
			var searchName = data.name;
			// list of categories, must be exact
			var searchCategories = data.categories;
			// rating is of {max, min}, must be numbers
			var searchRating	 = data.rating;

			// difficulty is of {max, min}, must be numbers
			var searchDifficulty = data.difficulty;
			var validDifficulty = false;
			if (searchDifficulty) 
				if (!isNan(searchDifficulty.max) && !isNan(searchDifficulty.min)) {
					validDifficulty = true;
				}
			// list of ingredients
			var searchIngredients = data.ingredients;
			// author name, must be exact
			var searchAuthor = data.author;
			var results = {};
			Recipe.find({name: searchName}, null, null, function(err, recipes) {
				if (err) {
					console.log("error finding recipes: " + err);
				} else {
					filterCategory(searchCategories, recipes, function(filteredResultCategory) {
						filterRating(searchRating.min, searchRating.max, filteredResultCategory, function(filteredResultRating) {
							filterDifficulty(searchDifficulty.min, searchDifficulty.max, filteredResultRating, function(filteredResultDifficulty) {
								filterIngredients(searchIngredients, filteredResultDifficulty, function(filteredResultIngredients) {
									filteredAuthor(searchAuthor, filteredResultDifficulty, function(filteredResultAuthor) {
										results = filteredResultAuthor;
									});
								});		
							});
						});
					});
					// Filter data onto results
				}
				socket.emit("search", results);
			});
		});

	});
}