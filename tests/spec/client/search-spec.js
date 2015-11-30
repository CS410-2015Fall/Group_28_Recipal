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
    }));

    it('$scope.search', function() { 
        socketService.expect('search', {name: ""}, []);
        socketService.expect('search', {name: "garlic"}, [{name: "best brownies"}]);

        searchCtrl.searchInput = "garlic";
        searchCtrl.search();
            // Simulate receive search event from server, received data is already "expected"
            socketService.receive('search');

            expect($rootScope.searchResults).toEqual([{name: "best brownies"}]);
        });

    it('$scope.onRecipeSelect', function() {
        var received = false;
        var recipe = {name: "best brownies"};
            // listen to expected event
            $rootScope.$on('setRecipe', function(event, _recipe_) {
                expect(recipe).toEqual(_recipe_);
                received = true;
            });
            searchCtrl.onRecipeSelect(recipe);
            expect(received).toBe(true);
        });
});