"use strict";

angular.module('account.services', ['socket.services', 'settings.services'])
.factory('accountService', function($http, socketService, settingsService) {
	var defaultAcc = {name: "Guest"};
	return {
		accountInfo: {name: "Guest"},
		status: {code: 0, error: ""},
		login: function(loginInfo, successCb, errorCb) {
			var accountService = this;
			this.status.error = "Logging in...";
			$http({ method: 'POST', url: socketService.url + '/login', data: loginInfo})
			.then(function successCallback(response) {
				console.log("Receive login success status: " + response.statusText);
				console.log(JSON.stringify(response.data));
				angular.copy(response.data, accountService.accountInfo);
				accountService.status.code = 1;
				accountService.status.error = "Log in successful";
				successCb(response.data);
			}, function errorCallback(response) {
				console.log("Receive login error status: " + response.statusText);
				accountService.status.error = "Log in failed";
				errorCb();
			});
		},
		createAccount: function(createInfo, successCb, errorCb) {
			var accountService = this;
			this.status.error = "Creating account...";
			$http({ method: 'POST', url: socketService.url + '/createAccount', data: createInfo})
			.then(function successCallback(response) {
				console.log("Receive createAccount success status: " + response.statusText);
				console.log(JSON.stringify(response.data));
				accountService.status.error = "Create account successful";
				successCb(response.data);
			}, function errorCallback(response) {
				console.log("Receive createAccount error status: " + response.statusText);
				accountService.status.error = "Create account failed";
				errorCb();
			});
		},
		logout: function() {
			var savedInfo = {};
			// TODO: can avoid copy?
			angular.copy(this.accountInfo, savedInfo);
			angular.copy(defaultAcc, this.accountInfo);
			if (settingsService.saveLoginInfo.username)
				this.accountInfo.username = savedInfo.username;
			if (settingsService.saveLoginInfo.password)
				this.accountInfo.password = savedInfo.password;

			this.status.code = 0;
			this.status.error = "Log out successful";
		},
		resetPassword: function(resetInfo, successCb, errorCb) {
			this.status.error = "Resetting password...";
			// TODO: Randomly pass/fail for fun for now
			if (Math.random() < 0.5) {
				successCb();
				this.status.error = "Password reset sent successfully to email";
			}
			else {
				errorCb();
				this.status.error = "Password reset failed";
			} 

		}
	};
});

