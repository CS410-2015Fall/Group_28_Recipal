"use strict";


angular.module('recipe.controllers', ['socket.services', 'notification.services', 'txt2speech-services'])
.controller('RecipeCtrl', ['$http', '$scope', '$rootScope', 'socketService', 'notificationService', 'txt2speechService', 
	function($http, $scope, $rootScope, socketService, notificationService, txt2speechService) {

	var recipeCtrl = this;
	var audio = new Audio("res/sound/alarm.mp3");
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
		if ($scope.checked.length < $scope.recipe.ingredients.length) {
			$scope.ingredientsChecked = false;
		    return;
		}
		console.log("DEBUG: " + $scope.checked);
		for (var i = 0;  i < $scope.checked.length; i++) {
		    if ($scope.checked[i] !== true) {
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

	if ($scope.recipe.image) {
		$scope.recipeImageAvailable = true;
		$scope.recipeImage = $scope.recipe.image;
	}

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
			audio.play();
			setTimeout(function(){alert("TIMER IS DONE!");},1000);
			
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

		txt2speechService.stop();
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
			if ($scope.recipe.steps[$scope.currentPage - 1].img) {
				$scope.currentImage = "";
				$scope.currentImage = $scope.recipe.steps[$scope.currentPage - 1].img;
				$scope.imageAvailable = true; 
			} else {
				$scope.currentImage = "";
				$scope.imageAvailable = false;
			}
		}
		txt2speechService.speak($scope.currentDescription);
		console.log("DEBUG: next step");
	};

	recipeCtrl.back = function() {
		if ($scope.timerState) {
			return;
		}

		txt2speechService.stop();
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
			if ($scope.recipe.steps[$scope.currentPage - 1].img) {
				$scope.currentImage = "";
				$scope.currentImage = $scope.recipe.steps[$scope.currentPage - 1].img;
				$scope.imageAvailable = true; 
			} else {
				$scope.currentImage = "";
				$scope.imageAvailable = false;
			}
			
		}
		txt2speechService.speak($scope.currentDescription);
		console.log("back");
	}
	console.log("recipe controller loaded");

	$scope.ratings = [1, 2, 3, 4, 5];
	var currentRating = $scope.recipe.rating.rating;
	$scope.imageSource = [];
	recipeCtrl.loadRating = function() {
		for (var i = 1; i < 6; i++) {
			if (i < currentRating) {
				$scope.imageSource[i] = "img/fillstar.jpg";
			} else {
				$scope.imageSource[i] = "img/emptystar.jpg";
			}
		}
	}
	$scope.ratingDescription = "How did you like this recipe?"
	recipeCtrl.loadRating();
	var rated = false;
	recipeCtrl.rate = function (rating) {
		if (rated) {
			return;
		}
		var data = {
	        name: $scope.recipe.name,
	        rating: rating,
        };
        // console.log("data is " + JSON.stringify(data));
		var postReq = {
            method: 'POST',
            url: socketService.url + '/rateRecipe',
            data: data,
        }
        $http(postReq).success(function(data) {
	        currentRating = rating + 1;
	        recipeCtrl.loadRating();
	        $scope.ratingDescription = "Thank you for rating!"
	        rated = true;
        });

    };	
	
}]);
