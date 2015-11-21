"use strict";

angular.module('search.controllers', ['socket.services'])
.controller('SearchCtrl', function($scope, socketService) {
    var searchController = this;
    searchController.searchInput = "";
    $scope.searchResults = [];
    searchController.search = function() {
        console.log(searchController.searchInput);
        socketService.emit('search', new Query("", "", {min: 0, max: 5}, {min: 0, max: 5}, null, [searchController.searchInput]));
        socketService.on('search', function(recipeArr) {
            console.log("DEBUG: Receive search results");
            $scope.searchResults = recipeArr;
            $scope.$evalAsync();
        });
    };
})