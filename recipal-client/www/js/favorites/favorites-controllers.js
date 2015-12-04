"use strict";

angular.module('favorites.controllers', ['account.services', 'storage.services', 'settings.services', 'favorites.services'])
.controller('FavoritesCtrl', ['$scope', '$state', '$rootScope', 'storageService', 'accountService', 'settingsService', 'favoritesService', 
    function($scope, $state, $rootScope, storageService, accountService, settingsService, favoritesService) {
	var favoritesCtrl = this;
	$scope.favorites;
    favoritesCtrl.isRefreshing = false; 

	$scope.$on('$ionicView.beforeEnter', function() {
		favoritesCtrl.refresh();
	});

    favoritesCtrl.onFavoriteToggle = function(recipe) {
        favoritesService.toggleFavorite(recipe);
    }

    // TODO: copied from search controller, better way?
    favoritesCtrl.onRecipeSelect = function(recipe) {
        // TODO: move currentRecipe into a service?
        $rootScope.currentRecipe = recipe;
        $rootScope.$evalAsync();
        $state.go('app.recipe');
    }

    favoritesCtrl.refresh = function() {
        if (favoritesCtrl.isRefreshing === true)
            return;
        
        console.log("Refreshing");
        favoritesCtrl.isRefreshing = true;
        favoritesService.getFavorites(function(favorites) {
                $scope.favorites = favorites;
                $scope.$evalAsync();
                console.log("DEBUG: Got favorites " + JSON.stringify(favorites));
                favoritesCtrl.isRefreshing = false;
        });
    }

    // 1 = ascending
    var orderDifficulty = 1; 
    var orderRating = 1;

    favoritesCtrl.sortRating = function() {
        if (orderRating === 1) {
            orderRating = 0;
            $scope.favorites.sort(function(a, b){return b.rating.rating - a.rating.rating});
        } else {
            orderRating = 1;
            $scope.favorites.sort(function(a, b){return a.rating.rating - b.rating.rating});
        }
        $scope.$evalAsync();
    }

    favoritesCtrl.sortDifficulty = function() {
        if (orderDifficulty === 1) {
            orderDifficulty = 0;
            $scope.favorites.sort(function(a, b){return a.difficulty - b.difficulty});
        } else {
            orderDifficulty = 1;
            $scope.favorites.sort(function(a, b){return b.difficulty - a.difficulty});
        }
        $scope.$evalAsync();
    }
}]);
