"use strict";

angular.module('recipe.controllers', [])
.controller('RecipeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	var recipeCtrl = this;
	var onRecipeSelect = function(recipe) {
		console.log(JSON.stringify(recipe));
		// TODO: Set current recipe to this; 
	}

	$rootScope.$on('setRecipe', function(event, recipe) {
		console.log("received event");
		onRecipeSelect(recipe);
	});

}]);
