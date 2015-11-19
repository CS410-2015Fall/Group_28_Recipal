"use strict"

angular.module('starter.controllers', [])
.controller('SearchCtrl', function($scope, $ionicModal, $timeout) {
    $scope.searchInput = {};

    $scope.search = function() {
        console.log($scope.searchInput.text);
        
        // socket.emit('search',new Query(query.name, query.author, query.rating, 
        //     query.difficulty, query.ingredients, query.categories));
        socket.emit('search', new Query("", "", {min: 0, max: 5}, {min: 0, max: 5}, null, [$scope.searchInput.text]));
        socket.on('search', function(recipeArr) {
            console.log("DEBUG: Receive search results");
            searchModel.setResults(recipeArr);
        });
    };
})