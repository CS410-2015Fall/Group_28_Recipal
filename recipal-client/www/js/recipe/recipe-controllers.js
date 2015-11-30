"use strict";

angular.module('recipe.controllers', [])
.controller('RecipeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	var recipeCtrl = this;
	$scope.recipe = $rootScope.currentRecipe;
	$scope.currentPage = 0;
	$scope.currentDescription = "";

	var loadChecked = function() {
		$scope.checked = [];
		for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
			$scope.checked.push(false);
		}
	}
	loadChecked();

	$scope.ingredientsChecked = false;

	var onRecipeSelect = function(recipe) {
		console.log(JSON.stringify(recipe)); 
		$scope.recipe = recipe;
		if ($scope.recipe) {
			loadChecked();
		}
		$scope.$evalAsync();		
	}
	
	$rootScope.$on('setRecipe', function(event, recipe) {
		console.log("received event");
		onRecipeSelect(recipe);
		// document.getElementById('page-container').style.display = 'none';
	}); 
	
	recipeCtrl.ingredientsChecker = function() {
		console.log($scope.checked);
		for (var i = 0;  i < $scope.checked.length; i++) {
		    if ($scope.checked[i] == false) {
		        $scope.ingredientsChecked = false;
		        return;

		    }
		}	
		$scope.ingredientsChecked = true;
	}

	$scope.timerButton = "Start";
	$scope.timerState = false;	
	$scope.timerSeconds = 0;
	$scope.timerMinutes = 0;
	$scope.timerHours = 0;

	var timer = 0;

	var timeLeft = 0;

	recipeCtrl.sendNotification = function() {
		// TODO for Tam
	}

	recipeCtrl.loadTimer = function() {
		timeLeft = $scope.recipe.steps[$scope.currentPage - 1].timer;
		recipeCtrl.updateTimer(timeLeft);
	}

	recipeCtrl.updateTimer = function(timeLeft) {
		if (timeLeft == 0) {
			$scope.timerSeconds = 0;
			$scope.timerMinutes = 0;
			$scope.timerHours = 0;
			$scope.timerState = false;
			clearInterval(timer);
			$scope.timerButton = "Done!";
			recipeCtrl.sendNotification();
		} else {
			$scope.timerSeconds = timeLeft % 60;
			$scope.timerMinutes = Math.floor(timeLeft / 60) % 60;
			$scope.timerHours = Math.floor(timeLeft / 3600) % 60;
		}
		$scope.$apply();
	}

	recipeCtrl.toggleTimer = function() {
		if (timeLeft == 0) {
			return;
		}
		if (($scope.timerState == true) && ($scope.timerState == true)) {
			$scope.timerButton = "Start";
			$scope.timerState = false;
			clearInterval(timer);
		} else {
			timer = setInterval(function(){ 
				timeLeft--;
				recipeCtrl.updateTimer(timeLeft);
			}, 1000);
			$scope.timerButton = "Stop";
			$scope.timerState = true;			
		}
	}

	recipeCtrl.restartTimer= function() {
		$scope.timerButton = "Start";
		$scope.timerState = false;
		recipeCtrl.loadTimer();
		clearInterval(timer);
	}
	
	recipeCtrl.next = function() {
		if ($scope.timerState) {
			return;
		}

		if ($scope.currentPage == 0) {
			recipeCtrl.ingredientsChecker();
			if ($scope.ingredientsChecked) {
				$scope.currentPage++;
			} else {
				return;
			}
		} else {
			$scope.currentPage++;
		}

		if (($scope.currentPage - 1) == $scope.recipe.steps.length) {
			console.log("last page");
		} else {
			console.log()
			if (($scope.recipe.steps[$scope.currentPage - 1].timer == 0) || (typeof $scope.recipe.steps[$scope.currentPage - 1].timer === 'undefined')) {
				$scope.displayTimer = false;
			} else {
				console.log("no timer");
				$scope.displayTimer = true;
				recipeCtrl.loadTimer();
			}
			$scope.currentDescription = $scope.recipe.steps[$scope.currentPage - 1].description;
		}

		console.log("next step");
	}

	recipeCtrl.back = function() {
		if ($scope.timerState) {
			return;
		}

		$scope.currentPage--;
		if ($scope.currentPage == 0) {
			$scope.currentDescription = "";
		} else {
			if (($scope.recipe.steps[$scope.currentPage - 1].timer == 0) || (typeof $scope.recipe.steps[$scope.currentPage - 1].timer === 'undefined')) {
				$scope.displayTimer = false;
			} else {
				$scope.displayTimer = true;
				recipeCtrl.loadTimer();
			}
			$scope.currentDescription = $scope.recipe.steps[$scope.currentPage - 1].description;
		}
		console.log("back");
	}
	console.log("recipe controller loaded");
	
}]);
