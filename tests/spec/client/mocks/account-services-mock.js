"use strict";

angular.module('account.services.mock', [])
.factory('accountService', function() {
	return {
		remoteFavorites: [];
		accountInfo: {},
		status: {code: 0, error: ""},
		init: function() {
		},
		login: function(loginInfo, successCb, errorCb) {
		},
		createAccount: function(createInfo, successCb, errorCb) {
		},
		logout: function() {
		},
		resetPassword: function(resetInfo, successCb, errorCb) {
		},
		addFavorites: function(recipe) {
			this.remoteFavorites.push(recipe);
		},

		removeFavorites: function(recipe) {
			for (i = 0; i < this.remoteFavorites.length; i++) {
				if (this.remoteFavorites[i]._id === recipe._id)
					this.remoteFavorites.splice(i, 1);
			}
		},
		getFavorites: function(callback) {
			callback(this.remoteFavorites)
		}
	};
});

