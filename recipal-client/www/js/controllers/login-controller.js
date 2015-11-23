"use strict"

angular.module('login.controllers', [])
.controller('LoginCtrl', function($scope, $http) {
	$scope.errorTxt = "";
	//$scope.accountInfo;

	var loginController = this;
	this.loginData = {};
	
	this.login = function() {
		$http({ method: 'POST', url: URL + '/login', 
			data: {username: this.loginData.username, password: this.loginData.password}})
		.then(function successCallback(response) {
			console.log("Receive login success status: " + response.statusText);
    				// TODO: Set data, clear fields
    				console.log("Data: " + JSON.stringify(response.data));

    			}, function errorCallback(response) {
    				// TODO: clear fields
    				console.log("Receive login error status: " + response.statusText);
    				$scope.errorTxt = "Login failed";
    				$scope.$evalAsync();
    			});
	};

	this.createData = {};

	loginController.createAccount = function() {
		$http({ method: 'POST', url: URL + '/createAccount', 
			data: {name: this.createData.name, username: this.createData.username, 
					password: this.createData.password, email: this.createData.email}})
		.then(function successCallback(response) {
			console.log("Receive createAccount success status: " + response.statusText);
    				// TODO: Set data, clear fields
    				console.log("Data: " + JSON.stringify(response.data));

    			}, function errorCallback(response) {
    				// TODO: clear fields
    				console.log("Receive createAccount error status: " + response.statusText);
    				$scope.errorTxt = "Account creation failed";
    				$scope.$evalAsync();
    			});
	}
	
	loginController.forgotPass = function() {
		$http({ method: 'POST', url: URL + '/forgotpass',
			data: {email: this.createData.email}})
		.then(function successCallback(response) {
			console.log("Send password to email: " + response.statusText);
			//	SEND EMAIL?
			console.log("Data: " + JSON.stringify(response.data));
			}, function errorCallback(response) {
				// TODO: clear fields
				console.log("Forgotten password status: " + response.statusText);
				$scope.errorTxt = "Email not found"
				$scope.$evalAsync();
			});
	}
	
});
			// welcomeMessage = "Welcome Back " + data.name;
				// 				}

				// 			} else {
				// 				$('#login-pass').val("");
				// 				$('#loginStatusMessage').replaceWith("Please try again!");
				// 			}
				// 		});
				// 	};
				// });