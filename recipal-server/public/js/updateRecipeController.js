angular.module('webFrontEnd').controller('updateRecipeController', ['$http', '$rootScope', '$scope',
    function($http, $rootScope, $scope) {
    	var ctrl = this;

        ctrl.name = "";
        ctrl.difficulty = 0;
        ctrl.duration = 0;
        ctrl.ingredients = [];
        ctrl.categories = [];
        ctrl.steps = [];


        ctrl.load = function(recipe) {
            console.log("recipe is " + JSON.stringify(recipe));
        	ctrl.name = recipe.name;
            ctrl.oldname = recipe.name;
            console.log("name is " + ctrl.name);
        	ctrl.difficulty = recipe.difficulty;
        	ctrl.duration = recipe.duration;
        	ctrl.ingredients = function() {
                var ingredientString = "";
                for (var i=0; i< recipe.ingredients.length; i++) {
                    if (i === 0) {
                        ingredientString = recipe.ingredients[i];
                    } else {
                        ingredientString = ingredientString + "," + recipe.ingredients[i];
                    }
                }
                return ingredientString;
            }();
        	ctrl.categories = function() {
                var categoriesString = "";
                for (var i=0; i< recipe.categories.length; i++) {
                    if (i === 0) {
                        categoriesString = recipe.categories[i];
                    } else {
                        categoriesString = categoriesString + "," + recipe.categories[i];
                    }
                }
                return categoriesString;
            }();
            console.log("ingredients are "+ ctrl.ingredients);
            console.log("categories are "+ ctrl.categories);
            
        	ctrl.steps = recipe.steps;
            console.log("steps are "+ ctrl.steps.length);
            // $scope.$apply();
        }
        // load($rootScope.recipe);
    	ctrl.addStep = function() {
    		ctrl.steps.push({});
    		console.log(ctrl.name);
    	}
        ctrl.removeStep = function() {
            ctrl.steps.pop();
        }

    	ctrl.submitRecipe = function() {
    		var ingredients = ctrl.ingredients.split(',');
    		var categories = ctrl.categories.split(',');
    		var data = {
                    oldname: ctrl.oldName,
                    name: ctrl.name,
                    difficulty: ctrl.difficulty,
                    duration: ctrl.duration,
                    ingredients: ingredients,
                    categories: categories,
                    steps: ctrl.steps,
                    image: ctrl.image,
                    author: $rootScope.username,
                };
            console.log("data is " + JSON.stringify(data));
    		var postReq = {
                method: 'POST',
                url: '/updateRecipe',
                data: data,
            }
            $http(postReq).success(function(data) {
            	console.log("updated recipe yay " + data);
            });
    	}

        ctrl.deleteRecipe = function(recipe) {
            var data = {
                    name: recipe.name,
                };
            console.log("data is " + JSON.stringify(data));
            var postReq = {
                method: 'POST',
                url: '/deleteRecipe',
                data: data,
            }
            $http(postReq).success(function(data) {
                console.log("deleted recipe yay " + data);
            });            
        }
 	}
]);