"use strict";

angular.module('favorites.controllers', ['account.services', 'storage.services', 'settings.services'])
.controller('FavoritesCtrl', ['$scope', '$state', '$rootScope', 'storageService', 'accountService', function($scope, $state, $rootScope, storageService, accountService) {
    //var searchController = this;
    $scope.recipe;
    $scope.$on('$ionicView.loaded', function() {
		if (settingsService.settings.localStor)
			$scope.recipe = storageService.get("favorites");
	});
}]);
