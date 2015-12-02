"use strict";

angular.module('account.loginControllers', ['account.services', 'settings.services'])
.controller('LoginCtrl', function($scope, $state, $ionicHistory, accountService, settingsService){
	this.loginData = {username: accountService.accountInfo.username,
		password: accountService.accountInfo.password};
		$scope.status = accountService.status;
		$scope.saveLoginInfo = settingsService.settings.saveLoginInfo;
		
		$scope.$on('$ionicView.leave', function() {
			settingsService.saveAllSettings();
		});

		this.login = function() {
			accountService.login(this.loginData, 
				function(data) {
					$scope.status = accountService.status;
					$scope.$evalAsync();
				// Go to account page and turn off back button to prevent going back to login page
				$ionicHistory.nextViewOptions({ disableBack: true });
				$state.go('app.account');

			}, function() {
				$scope.status = accountService.status;
				$scope.$evalAsync();
			});
		};
	})
.controller('CreateAccountCtrl', function($scope, $state, accountService) {
	this.createData = {};
	$scope.status = accountService.status;

	this.createAccount = function() {
		accountService.createAccount(this.createData, 
			function(data) {
				$scope.status = accountService.status;
				$scope.$evalAsync();
				// Go back to log in page
				$state.go('app.login');
				
			}, function errorCallback() {
				$scope.status = accountService.status;
				$scope.$evalAsync();
			});
	};
})
.controller('ForgotPassCtrl', function($scope, $state, accountService) {
	this.resetData = {};
	$scope.status = accountService.status;

	this.resetPass = function() {
		accountService.resetPassword(this.resetData, 
			function(data) {
				$scope.status = accountService.status;
				$scope.$evalAsync();
				// Go back to log in page
				$state.go('app.login');
				
			}, function errorCallback() {
				$scope.status = accountService.status;
				$scope.$evalAsync();
			});
	};
});