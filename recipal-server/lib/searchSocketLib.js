var ss = require('socket.io-stream');
var fs = fs = require('fs');
var Path = require('path');
var Recipe = require('../models/recipe');
var Category = require('../models/category');
var Ingredient = require('../models/ingredient');
var Account = require('../models/account');
var Q = require('q');

// Helpers
Array.prototype.contains = function(k) {
  	for(var i=0; i < this.length; i++){
    	if (this[i] == k) {
      		return true;
    	}
  	}
  	return false;
}

var listContains = function(haystack, needles){
	// console.log("haystack is "+ haystack);
	// console.log("needles is "+ needles);
	var listOfBooleans = [];
	if (needles.length === 0) {
		return [false];
	}
	for(var i = 0; i < needles.length; i++){
	    if (haystack.indexOf(needles[i]) === -1) {
	        listOfBooleans[i] = false;
	    } else {
	    	listOfBooleans[i] = true;
	    }
	}
    return listOfBooleans;
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

var toLower = function(str) {
	if (str) {
		if (typeof str === 'string') {
			return str.toLowerCase();
		} else if (str instanceof Array) {
			result = [];
			for (var i = 0; i < str.length; i++) {
				if (typeof str[i] === 'string'){
					result[i] = str[i].toLowerCase();
				}
			}
			return result;
		} else {
			return null;
		}
	} else {
		return null;
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
	var result = [];
	var errHandler = function(err) {
		console.log("Error searching category in DB: " + err);
	};
	if (categories) {
		if (categories.length && recipes) {
			var categoryPromiss = [];
			var listOfCategories = [];
			for (var i = 0; i < categories.length; i++) {
				categoryPromiss.push(Category.findOne({name: categories[i]}, null, null).then(function(category) {
					if (category != null) {
						// console.log("category is " + category);
						listOfCategories.push(category._id);
					}
				}, errHandler));
			}
			Q.all(categoryPromiss).then(function() {
				// console.log("listOfCategories is " + listOfCategories);
				if (recipes.length) {
					// console.log(recipes);
					
					for (var j = 0; j < recipes.length; j++) {
						var success = [];

						success = listContains(recipes[j].categories, listOfCategories);
						if (checkIfOneTrue(success)) {
							result.push(recipes[j]);
						}
					}
					// console.log("Result is? " + result);
					done(result);
					return;
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

}

var filterRating = function (range, recipes, done) {
	var max = 0;
	var min = 0;
	var validRating = false;
	if (range) 
		if (!isNaN(range.max) && !isNaN(range.min)) {
			validRating = true;
			max = range.max;
			min = range.min;
		}
	var result = [];
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
	// console.log("in difficultyCheck, recipe is " + recipes);
	var max = 0;
	var min = 0;
	var validDifficulty = false;
	console.log("before if loop, range is " + range);
	if (range) {
		console.log("range is not null");
		if (!isNaN(range.max) && !isNaN(range.min)) {
			validDifficulty = true;
			max = range.max;
			min = range.min;
			console.log("min and max is good");
		} else {
			console.log("range is not valid");
		}
	} else {
		console.log("range is not valid for range null");
	}
	var result = [];
	if ((recipes.length >= 0) && validDifficulty) {
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

var filterIngredients = function(ingredients, recipes, done) {
	var result = [];
	var errHandler = function(err) {
		console.log("Error searching ingredients in DB: " + err);
	};
	if (ingredients) {
		if (ingredients.length && recipes) {
			var ingredientPromiss = [];
			var listOfIngredients = [];
			for (var i = 0; i < ingredients.length; i++) {
				ingredientPromiss.push(Ingredient.findOne({name: ingredients[i]}, null, null).then(function(ingredient) {
					if (ingredient != null) {
						listOfIngredients.push(ingredient._id);
					}
				}, errHandler));
			}
			Q.all(ingredientPromiss).then(function() {
				if (recipes.length) {
					for (var j = 0; j<recipes.length; j++) {
						var success = [];
						success = listContains(recipes[j].ingredients, listOfIngredients);
						if (checkIfAllTrue(success)) {
							result.push(recipes[j]);
						}
					}
					done(result);
					return
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
}

var filterAuthor = function(author, recipes, done) {
	var result = [];
	if (author) {
		Account.findOne({name: author}, null, null, function(err, authorObject) {
			if (err) {
				console.log("Error searching for author " + err);
			} else {
				for (var i = 0; i < recipes.length; i++) {
					console.log(recipes[i].accountRef);
					console.log(authorObject._id);
					if (JSON.stringify(recipes[i].accountRef) === JSON.stringify(authorObject._id)) {
						console.log("pushin recipe");
						result.push(recipes[i]);
					}
				}
			}
			done(result);
			return
		});
	} else {
		done(recipes);
		return;
	}
	
}


module.exports = function(io) {
	
	io.of('/search').on('connection', function(socket) {
		console.log("Someone connected");
		// TODO: Establish user centric connections
		// Don't know what sorting is needed, need to implement in future
		// Event tag is used for both directions of communication

		// search based on name, or empty other wise
		// data contains: Name, Category, Rating, Difficulty, Ingredients(that user has), and authorName 
		// http://howtonode.org/promises
		socket.on("search", function(data) {


			var searchName = toLower(data.name);
			var nameCriteria = {};
			if (searchName != null) {
				 nameCriteria = {'name' : searchName};
			} else {
				console.log("got empty search for name");
			}
			// list of categories, must be exact
			var searchCategories = toLower(data.categories);
			// rating is of {max, min}, must be numbers
			var searchRating	 = data.rating;

			// difficulty is of {max, min}, must be numbers
			var searchDifficulty = data.difficulty;

			// list of ingredients
			var searchIngredients = toLower(data.ingredients);
			// author name, must be exact
			var searchAuthor = data.author;
			var results = [];
			Recipe.find(nameCriteria, null, null, function(err, recipes) {
				if (err) {
					console.log("error finding recipes: " + err);
				} else {
					filterCategory(searchCategories, recipes, function(filteredResultCategory) {
						filterRating(searchRating, filteredResultCategory, function(filteredResultRating) {
							filterDifficulty(searchDifficulty, filteredResultRating, function(filteredResultDifficulty) {
								filterIngredients(searchIngredients, filteredResultDifficulty, function(filteredResultIngredients) {
									filterAuthor(searchAuthor, filteredResultIngredients, function(filteredResultAuthor) {
										results = filteredResultAuthor;
										socket.emit("search", results);
									});
								});		
							});
						});
					});
				}
			});
		});

	});
}