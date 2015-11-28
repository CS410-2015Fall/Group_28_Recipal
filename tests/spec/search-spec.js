describe('search', function() {
    beforeEach(module('search.controllers'));

    var $controller;
    var $rootScope;
    var socketMock;
    var $state = {go: function() {}};

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $rootScope = _$rootScope_;
        socketMock = new sockMock($rootScope);
        $controller = _$controller_('SearchCtrl', { $scope: $rootScope , socketService: socketMock, 
                $rootScope: $rootScope, $state: $state});
    }));

    describe('$scope.search', function() {
        it('set results array returned by server', function() { 
            socketMock.expect('search', {name: ""}, []);
            socketMock.expect('search', {name: "garlic"}, [{name: "best brownies"}]);

            $controller.searchInput = "garlic";
            $controller.search();
            // Simulate receive search event from server, received data is already "expected"
            socketMock.receive('search');

            expect($rootScope.searchResults).toEqual([{name: "best brownies"}]);
        });
    });

    describe('$scope.onRecipeSelect', function() {
        it('broadcast recipe to other controllers', function() {
            var received = false;
            var recipe = {name: "best brownies"};
            // listen to expected event
            $rootScope.$on('setRecipe', function(event, _recipe_) {
                expect(recipe).toEqual(_recipe_);
                received = true;
            });
            $controller.onRecipeSelect(recipe);
            expect(received).toBe(true);
        });
    });
});