"use strict";

angular.module('account.loginControllers', ['account.services', 'settings.services'])
.controller('LoginCtrl', function($scope, $state, $ionicHistory, accountService, settingsService){
	this.loginData = {username: accountService.accountInfo.username,
		password: accountService.accountInfo.password};
		$scope.loginStatus = "";
		$scope.signupStatus = "";
		$scope.forgotpassStatus = "";
		$scope.settings = settingsService.settings;

		this.login = function() {
			console.log(JSON.stringify($scope.settings));
			accountService.login(this.loginData, 
				function(data) {
			//		$scope.status = accountService.status;
					$scope.$evalAsync();
				// Go to account page and turn off back button to prevent going back to login page
				$ionicHistory.nextViewOptions({ disableBack: true });
				$state.go('app.account');

			}, function() {
				$scope.loginStatus = accountService.status;
				$scope.$evalAsync();
			});
		};
	})
.controller('CreateAccountCtrl', function($scope, $state, accountService) {
	this.createData = {};

	this.createAccount = function() {
		accountService.createAccount(this.createData, 
			function(data) {
				$scope.$evalAsync();
				// Go back to log in page
				$state.go('app.login');
				
			}, function errorCallback() {
				$scope.signupStatus = accountService.status;
				$scope.$evalAsync();
			});
	};
})
.controller('ForgotPassCtrl', function($scope, $state, accountService) {
	this.resetData = {};

	this.resetPass = function() {
		accountService.resetPassword(this.resetData, 
			function(data) {
				$scope.forgotpassStatus = accountService.status;
				$scope.$evalAsync();
				// Go back to log in page
				$state.go('app.login');
				
			}, function errorCallback() {
				$scope.forgotpassStatus = accountService.status;
				$scope.$evalAsync();
			});
	};
});