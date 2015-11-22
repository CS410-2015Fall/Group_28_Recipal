"use strict"

angular.module('search.controllers', [])
.controller('SearchCtrl', function($scope) {
    var searchController = this;
    searchController.searchInput = "";
    $scope.searchResults = [];
    searchController.search = function() {
        console.log(searchController.searchInput);

        socket.emit('search', {name: searchController.searchInput});
        socket.on('search', function(recipeArr) {
            console.log("DEBUG: Receive search results");
            $scope.searchResults = recipeArr;
            $scope.$evalAsync();
        });
    };
})