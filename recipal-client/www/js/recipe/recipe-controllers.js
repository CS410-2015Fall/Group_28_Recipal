"use strict";

angular.module('recipe.controllers', ['notification.services'])
.controller('RecipeCtrl', ['notificationService','$scope', '$rootScope', function(notificationService, $scope, $rootScope) {
	var recipeCtrl = this;
	$scope.recipe = $rootScope.currentRecipe;
	$scope.currentPage = 0;
	$scope.currentDescription = "";
	$scope.ingredientsChecked = false;
	$scope.checked = [];

	$scope.$on('$ionicView.enter', function() {
		// Hopefully $rootScope is updated by now
		recipeCtrl.onRecipeSelect($scope.recipe);
	});
	$scope.$on('$ionicView.leave', function() {
		notificationService.cancelAll();
	});

	recipeCtrl.loadChecked = function() {
		$scope.checked = [];
		for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
			$scope.checked.push(false);
		}
	};

	recipeCtrl.onRecipeSelect = function(recipe) {
		console.log("DEBUG: Recipe " + JSON.stringify(recipe)); 
		if ($scope.recipe) {
			recipeCtrl.loadChecked();
		}
		$scope.$evalAsync();
	};
	
	recipeCtrl.ingredientsChecker = function() {
		console.log("DEBUG: " + $scope.checked);
		for (var i = 0;  i < $scope.checked.length; i++) {
		    if ($scope.checked[i] == false) {
		        $scope.ingredientsChecked = false;
		        return;
		    }
		}	
		$scope.ingredientsChecked = true;
	};

	$scope.timerButton = "Start";
	$scope.timerState = false;	
	$scope.timerSeconds = 0;
	$scope.timerMinutes = 0;
	$scope.timerHours = 0;

	var timer = 0;

	var timeLeft = 0;

	recipeCtrl.loadTimer = function() {
		timeLeft = $scope.recipe.steps[$scope.currentPage - 1].timer;
		recipeCtrl.updateTimer(timeLeft);
	};

	recipeCtrl.updateTimer = function(timeLeft) {
		if (timeLeft == 0) {
			$scope.timerSeconds = 0;
			$scope.timerMinutes = 0;
			$scope.timerHours = 0;
			$scope.timerState = false;
			clearInterval(timer);
			$scope.timerButton = "Done!";
		} else {
			$scope.timerSeconds = timeLeft % 60;
			$scope.timerMinutes = Math.floor(timeLeft / 60) % 60;
			$scope.timerHours = Math.floor(timeLeft / 3600) % 60;
		}
		$scope.$evalAsync();
	};

	recipeCtrl.scheduleNotification = function() {
		// Schedule/Reschedule timer using next step id as id,
			// and description of next step as notification text 
			// and time is the time remaining from now
			var text;
			if ($scope.currentPage > $scope.recipe.steps.length - 1)
				 text = "DONE!";
			else text = $scope.recipe.steps[$scope.currentPage].description;
			
			var at = new Date(timeLeft*1000 + (new Date()).getTime());
			notificationService.schedule({id: $scope.currentPage, text: text, at: at});
	};

	recipeCtrl.toggleTimer = function() {
		if (timeLeft == 0) {
			return;
		}
		if (($scope.timerState == true) && ($scope.timerState == true)) {
			$scope.timerButton = "Start";
			$scope.timerState = false;
			clearInterval(timer);
			// Cancel notification (there's no way to "pause")
			notificationService.cancel($scope.currentPage);
		} else {
			timer = setInterval(function(){ 
				timeLeft--;
				recipeCtrl.updateTimer(timeLeft);
			}, 1000);
			$scope.timerButton = "Stop";
			$scope.timerState = true;
			recipeCtrl.scheduleNotification();
		}
	};

	recipeCtrl.restartTimer= function() {
		$scope.timerButton = "Start";
		$scope.timerState = false;
		recipeCtrl.loadTimer();
		clearInterval(timer);
		// Cancel notification (there's no way to "pause")
		notificationService.cancel($scope.currentPage);
	};
	
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
			console.log("DEBUG: last page");
		} else {
			if (($scope.recipe.steps[$scope.currentPage - 1].timer == 0) || (typeof $scope.recipe.steps[$scope.currentPage - 1].timer === 'undefined')) {
				$scope.displayTimer = false;
			} else {
				console.log("DEBUG: has timer");
				$scope.displayTimer = true;
				recipeCtrl.loadTimer();
			}
			$scope.currentDescription = $scope.recipe.steps[$scope.currentPage - 1].description;
		}

		console.log("DEBUG: next step");
	};

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
		console.log("DEBUG: back");
	};
}]);
