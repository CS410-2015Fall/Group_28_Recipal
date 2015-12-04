"use strict";

angular.module('account.services', ['socket.services', 'settings.services', 'storage.services'])
.factory('accountService', function($http, socketService, settingsService, storageService) {
	var defaultAcc = {name: "Guest"};
	var accountSockId = "";
	return {
		accountInfo: {},
		status: {code: 0, error: ""},
		init: function() {
			angular.copy(defaultAcc, this.accountInfo);
			accountSockId = socketService.connect("/account");
		},
		login: function(loginInfo, successCb, errorCb) {
			var accountService = this;
			this.status.error = "Logging in...";

			// Login
			$http({ method: 'POST', url: socketService.url + '/login', data: loginInfo})
			.then(function successCallback(response) {
				console.log("INFO: Receive login success status: " + response.statusText);
				console.log(JSON.stringify(response.data));
				angular.copy(response.data, accountService.accountInfo);
				angular.copy({code: 1, error: "Log in successful"}, accountService.status);
				successCb(response.data);
			}, function errorCallback(response) {
				console.log("INFO: Receive login error status: " + response.statusText);
				angular.copy({code: 0, error: "Log in failed"}, accountService.status);
				errorCb();
			});
			// TODO: Save login info (proper way is cookies) according to settings
			// savedLogin = {};
			// if (settingsService.settings.saveUsername)
			// 	savedLogin.username = loginInfo.username;
			// if (settingsService.settings.rememberMe && settingsService.settings.localStor) {
			// 	this.savedLogin.password = loginInfo.password;
			// 	storageService.set("loginInfo", this.savedInfo);
			// }
		},
		createAccount: function(createInfo, successCb, errorCb) {
			var accountService = this;
			this.status.error = "Creating account...";
			$http({ method: 'POST', url: socketService.url + '/createAccount', data: createInfo})
			.then(function successCallback(response) {
				console.log("INFO: Receive createAccount success status: " + response.statusText);
				console.log(JSON.stringify(response.data));
				accountService.status.error = "Create account successful";
				successCb(response.data);
			}, function errorCallback(response) {
				console.log("INFO: Receive createAccount error status: " + response.statusText);
				accountService.status.error = "Create account failed";
				errorCb();
			});
		},
		logout: function() {
			this.accountInfo = defaultAcc;

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
		},
		addFavorites: function(recipe) {
			if (this.status.code !== 1) {
				console.log("DEBUG: did not add favorite on server: Not logged in");
				return;
			}

			// Add favorites
			$http({ method: 'POST', url: socketService.url + '/addBookmark', data: {username: this.accountInfo.username, password: this.accountInfo.password, name: recipe.name}})
			.then(function successCallback(response) {
				console.log("INFO: Receive add favorites success status: " + response.statusText + "\n" + JSON.stringify(response.data));
			}, function errorCallback(response) {
				console.log("INFO: Receive add favorites error status: " + response.statusText);
			});
		},

		removeFavorites: function(recipe) {
			if (this.status.code !== 1) {
				console.log("DEBUG: did not remove favorite on server: Not logged in");
				return;
			}
			// Add favorites
			$http({ method: 'POST', url: socketService.url + '/removeBookmark', data: {username: this.accountInfo.username, password: this.accountInfo.password, name: recipe.name}})
			.then(function successCallback(response) {
				console.log("INFO: Receive remove favorites success status: " + response.statusText + "\n" + JSON.stringify(response.data));
			}, function errorCallback(response) {
				console.log("INFO: Receive remove favorites error status: " + response.statusText);
			});
		},
		getFavorites: function(callback) {
			if (this.status.code !== 1) {
				console.log("DEBUG: did not get favorites from server: Not logged in");
				callback([]);
			}
			socketService.emit(accountSockId, "bookmarks", {username: this.accountInfo.username, password: this.accountInfo.password});
			socketService.on(accountSockId, "bookmarks", callback);
	}
};
});

