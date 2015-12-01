"use strict";

angular.module('search.controllers', ['socket.services'])
.controller('SearchCtrl', ['$scope', '$state', '$rootScope', 'socketService', function($scope, $state, $rootScope, socketService) {
    var searchController = this;
    searchController.searchInput = "";
    $scope.searchResults = [];
    searchController.search = function() {

        socketService.emit('search', {name: searchController.searchInput});

        socketService.on('search', function(recipeArr) {
            console.log("INFO: Receive search results");
            $scope.searchResults = recipeArr;
            $scope.$evalAsync();
        });
    };

    searchController.onRecipeSelect = function(recipe) {
        // TODO: move currentRecipe into a service?
        $rootScope.currentRecipe = recipe;
        $rootScope.$evalAsync();
        $state.go('app.recipe');
    }

    // 1 = ascending
    var orderDifficulty = 1; 
    var orderRating = 1;

    searchController.sortRating = function() {
        if (orderRating === 1) {
            orderRating = 0;
            $scope.searchResults.sort(function(a, b){return b.rating.rating - a.rating.rating});
        } else {
            orderRating = 1;
            $scope.searchResults.sort(function(a, b){return a.rating.rating - b.rating.rating});
        }
    }

    searchController.sortDifficulty = function() {
        if (orderDifficulty === 1) {
            orderDifficulty = 0;
            $scope.searchResults.sort(function(a, b){return a.difficulty - b.difficulty});
        } else {
            orderDifficulty = 1;
            $scope.searchResults.sort(function(a, b){return b.difficulty - a.difficulty});
        }
    }
}])
