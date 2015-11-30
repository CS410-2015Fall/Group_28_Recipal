"use strict";

angular.module('search.controllers', ['socket.services'])
.controller('SearchCtrl', ['$scope', '$state', '$rootScope', 'socketService', function($scope, $state, $rootScope, socketService) {
    var searchController = this;
    searchController.searchInput = "";
    $scope.searchResults = [];
    searchController.search = function() {
        socketService.emit('search', {name: searchController.searchInput});
        socketService.on('search', function(recipeArr) {
            console.log("DEBUG: Receive search results");
            $scope.searchResults = recipeArr;
            $scope.$evalAsync();
        });
    };

    searchController.onRecipeSelect = function(recipe) {
        $rootScope.currentRecipe = recipe;
        $state.go('app.recipe');
        $rootScope.$broadcast('setRecipe', recipe);
        console.log("pushing event");
    }
}])
