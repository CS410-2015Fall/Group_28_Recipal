"use strict";

angular.module('account.profileControllers', ['account.services'])
.controller('ProfileCtrl', function($scope, $ionicHistory, $state, accountService) {
	$scope.accountInfo = accountService.accountInfo;
	
	this.logout = function() {
		accountService.logout();
		$scope.accountInfo = accountService.accountInfo;
		$scope.$evalAsync();
		// Go to login page and turn off back button to prevent going back to account page
		$ionicHistory.nextViewOptions({ disableBack: true });
		$state.go('app.login');
	};
});
