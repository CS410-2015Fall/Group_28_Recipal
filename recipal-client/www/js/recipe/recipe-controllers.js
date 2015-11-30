"use strict";

angular.module('recipe.controllers', [])
.controller('RecipeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	var recipeCtrl = this;
	$scope.recipe = {};
	var ingredientsCollected = 0;
	var ingredientsNeeded = 0;
	var stepCounter = 1;
	
	var onRecipeSelect = function(recipe) {
		console.log(JSON.stringify(recipe)); 
		$scope.recipe = recipe;
		ingredientsNeeded = $scope.recipe.ingredients.length;
		$scope.$evalAsync();		
	}
	
	$rootScope.$on('setRecipe', function(event, recipe) {
		console.log("received event");
		onRecipeSelect(recipe);
		document.getElementById('instructions-container').style.display = 'none';
	});
	
	recipeCtrl.ingredientsChecker = function() {
		ingredientsCollected++;
		
		if (ingredientsCollected === ingredientsNeeded) {
				console.log("got all");
				document.getElementById('ingredientslist-container').style.display = 'none';
				document.getElementById('instructions-container').style.display = 'block';
		}		
	}
	
	recipeCtrl.displayClock = function() {
		var clockDisplay = document.getElementById('clockdiv');
		
	}
	
	recipeCtrl.next = function() {
		console.log("next step");
		if (stepCounter < $scope.recipe.steps.length) {
			document.getElementById("instructions").innerHTML = $scope.recipe.steps[stepCounter].description;
			stepCounter++;
		} else {
		}
	}
	
	recipeCtrl.back = function() {
		// CHECK IF ON FIRST STEP; IF TRUE, DISPLAY INGREDIENTS
		// document.getElementById('ingredientslist-container').style.display = "block";
		// document.getElementById('instructions-container').style.display = "none";
		console.log("back");
		if (stepCounter > 0) {
			document.getElementById("instructions").innerHTML = $scope.recipe.steps[stepCounter].description;
			stepCounter--;
		} else {
		}
	}
	
	
}]);
