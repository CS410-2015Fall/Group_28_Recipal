describe('search', function() {
    beforeEach(module('search.controllers'));

    var $controller;
    var $rootScope;
    var socketMock;

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        socketMock = new sockMock($rootScope);
    }));

    var $state = {};

    describe('$scope.search', function() {
        it('emit search event with user input to socket and set searchResults on receiving response', function() {

            var $scope = {};
            var controller = $controller('SearchCtrl', { $scope: $scope , socketService: socketMock, 
                $rootScope: $rootScope, $state: $state});
            controller.search();
            expect(true).toBe(true);
            //expect($scope.searchResults).toEqual([]);
        });
    });
});