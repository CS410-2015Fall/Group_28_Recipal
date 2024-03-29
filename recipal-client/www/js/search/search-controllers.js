"use strict";

angular.module('search.controllers', ['socket.services', 'account.services', 'favorites.services'])
.controller('SearchCtrl', ['$scope', '$state', '$rootScope', 'socketService', 'accountService', 'favoritesService', function($scope, $state, $rootScope, socketService, accountService, favoritesService) {
    var searchController = this;
    $rootScope.searchResults = [];
    searchController.searchInput;
    
    $scope.searchSockId;
    $scope.favorites;
    $scope.searching = {};

    $scope.$on('$ionicView.loaded', function() { 
        $scope.searchSockId = socketService.connect("/search"); 
        $scope.$evalAsync();
    });

    $scope.$on('$ionicView.beforeEnter', function() { 
        favoritesService.getFavorites(function(favorites) {
                console.log("DEBUG: Got favorites: " + "\n" + JSON.stringify(favorites));
                $scope.favorites = favorites;
                searchController.matchFavorites();
        });
    });

    searchController.matchFavorites = function() {
        // TODO : very slow, but no easy way to do this, including to speed up inner loop using binary search somehow
        var i;
        for (i = 0; i < $rootScope.searchResults.length; i++) {
            var j;
            for (j = 0; j < $scope.favorites.length; j++) {
                if ($rootScope.searchResults[i]._id === $scope.favorites[j]._id) {
                    $rootScope.searchResults[i].isFavorite = true;
                    break;
                }
            }
            if (j === $scope.favorites.length)
                $rootScope.searchResults[i].isFavorite = false;
        }
        $scope.$evalAsync();
    }

    searchController.search = function() {
        $scope.searching.value = true;
        console.log("Starting search");
        socketService.emit($scope.searchSockId, 'search', {name: searchController.searchInput});

        socketService.on($scope.searchSockId, 'search', function(recipeArr) {
            console.log("INFO: Receive " + (recipeArr? recipeArr.length : 0) + " search result(s)");
            $rootScope.searchResults = recipeArr;
            searchController.matchFavorites();
            $scope.$evalAsync();
            $scope.searching.value = false;
        });

    };

    searchController.onRecipeSelect = function(recipe) {
        // TODO: move currentRecipe into a service?
        
        $rootScope.currentRecipe = recipe;
        $rootScope.$evalAsync();
        $state.go('app.recipe');
    }


    searchController.onFavoriteToggle = function(_recipe_) {
        // TODO: move favorites list into a service?
       var recipe = angular.copy(_recipe_);
       delete recipe.isFavorite;
       favoritesService.toggleFavorite(recipe);
       _recipe_.isFavorite = !_recipe_.isFavorite;
       // TODO: UI update
    }


    // 1 = ascending
    var orderDifficulty = 1; 
    var orderRating = 1;

    searchController.sortRating = function() {
        if (orderRating === 1) {
            orderRating = 0;
            $rootScope.searchResults.sort(function(a, b){return b.rating.rating - a.rating.rating});
        } else {
            orderRating = 1;
            $rootScope.searchResults.sort(function(a, b){return a.rating.rating - b.rating.rating});
        }
        $scope.$evalAsync();
    }

    searchController.sortDifficulty = function() {
        if (orderDifficulty === 1) {
            orderDifficulty = 0;
            $rootScope.searchResults.sort(function(a, b){return a.difficulty - b.difficulty});
        } else {
            orderDifficulty = 1;
            $rootScope.searchResults.sort(function(a, b){return b.difficulty - a.difficulty});
        }
        $scope.$evalAsync();
    }
}])
