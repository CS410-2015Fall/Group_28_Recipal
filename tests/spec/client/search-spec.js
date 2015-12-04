"use strict";

describe('search', function() {
    beforeEach(module('search.controllers'));
    beforeEach(module('socket.services.mock'));

    var searchCtrl;
    var $rootScope;
    var socketService;
    var $state = {go: function() {}};

    beforeEach(inject(function(_socketService_, _$controller_, _$rootScope_) {
        $rootScope = _$rootScope_;
        socketService = _socketService_;
        searchCtrl = _$controller_('SearchCtrl', { $scope: $rootScope , socketService: socketService, 
            $rootScope: $rootScope, $state: $state});
        $rootScope.favorites = [];
        $rootScope.searchResults = [];
    }));

    it('$scope.search', function() { 
        socketService.expect('search', {name: ""}, []);
        socketService.expect('search', {name: "garlic"}, [{name: "best brownies", _id: "10"}]);

        searchCtrl.searchInput = "garlic";
        searchCtrl.search();
            // Simulate receive search event from server, received data is already "expected"
            socketService.receive('search');

            expect($rootScope.searchResults).toEqual([{name: "best brownies", _id: "10", isFavorite: false}]);
        });

    it('$scope.onRecipeSelect', function() {
        var recipe = {name: "best brownies"};

        searchCtrl.onRecipeSelect(recipe);
        expect($rootScope.currentRecipe).toEqual(recipe);
        });

    it('$scope.matchFavorites', function() {
        $rootScope.searchResults = [{name: "best brownies", _id: "12"}, 
                                    {name: "best brownies", _id: "13"},
                                    {name: "pizza", _id: "14", isFavorite: false},
                                    {name: "monster", _id: "15", isFavorite: true}];
        $rootScope.favorites = [{name: "pizza", _id: "14"},
                                {name: "best brownies", _id: "12"}];

        searchCtrl.matchFavorites();

        expect($rootScope.searchResults.length).toEqual(4);
        expect($rootScope.searchResults[0]).toEqual({name: "best brownies", _id: "12", isFavorite: true});
        expect($rootScope.searchResults[1]).toEqual({name: "best brownies", _id: "13", isFavorite: false});
        expect($rootScope.searchResults[2]).toEqual({name: "pizza", _id: "14", isFavorite: true});
        expect($rootScope.searchResults[3]).toEqual({name: "monster", _id: "15", isFavorite: false});
        });

});