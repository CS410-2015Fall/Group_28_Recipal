"use strict"

angular.module('starter.controllers', [])
.controller('SearchCtrl', function($scope, $ionicModal, $timeout) {
    $scope.searchInput = "breakfast";
    var searchController = this;
    searchController.searchInput = "sweets";

    $scope.search = function() {
        // console.log($scope.searchInput);
        console.log(searchController.searchInput);
        // socket.emit('search',new Query(query.name, query.author, query.rating, 
        //     query.difficulty, query.ingredients, query.categories));
        socket.emit('search', new Query("", "italian", {min: 0, max: 5}, {min: 0, max: 5}, null, [$scope.searchInput]));
        socket.on('search', function(recipeArr) {
            console.log("recipeArr is " + recipeArr);
            console.log("DEBUG: Receive search results");
            searchModel.setResults(recipeArr);
        });
    };
})