"use strict";

angular.module('account.profileControllers', ['account.services', 'settings.services'])
.controller('ProfileCtrl', ['$scope', '$ionicHistory', '$state', 'accountService', 'settingsService', function($scope, $ionicHistory, $state, accountService, settingsService) {
	$scope.accountInfo = accountService.accountInfo;
	$scope.settings = settingsService.settings;
	$scope.status = accountService.status;
	
	this.logout = function() {
		accountService.logout();
		$scope.accountInfo = accountService.accountInfo;
		$scope.$evalAsync();
		// Go to login page and turn off back button to prevent going back to account page
		$ionicHistory.nextViewOptions({ disableBack: true });
		$state.go('app.login');
	};
}]);
