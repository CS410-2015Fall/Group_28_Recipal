"use strict";

angular.module('search.controllers', ['socket.services'])
.controller('SearchCtrl', function($scope, socketService) {
    var searchController = this;
    searchController.searchInput = "";
    $scope.searchResults = [];
    searchController.search = function() {
        console.log(searchController.searchInput);

        socketService.emit('search', {name: searchController.searchInput});
        socketService.on('search', function(recipeArr) {
            console.log("DEBUG: Receive search results");
            $scope.searchResults = recipeArr;
            $scope.$evalAsync();
        });
    };
})
