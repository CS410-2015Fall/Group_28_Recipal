"use strict";

angular.module('favorites.services', ['socket.services', 'settings.services', 'storage.services', 'account.services'])
.factory('favoritesService', function($http, socketService, settingsService, storageService, accountService) {
	var favorites = [];
	return {
		init: function() {
			if (settingsService.settings.localStor) {
				var savedFavorites = storageService.get("favorites");
				if (savedFavorites)	{
					favorites = storageService.get("favorites");
					console.log("DEBUG: Got favorites from storage: " + JSON.stringify(favorites));
				}
				else console.log("DEBUG: could not load favorites from storage");
			}
			// accountService.getFavorites(function(favorites) {
			// 	this.favorites
			// });
			// this.socketId = socketService.connect("/account");
			// socketService.on(socketId, "bookmarks", function(favorites) {
			// 	console.log("DEBUG: Received favorites from server: " + JSON.stringify(favorites));
			// 	if (settingsService.settings.localStor) storageService.set("favorites", favorites);
			// 	this.favorites = favorites;
			// });
		},
		toggleFavorite: function(recipe) {
			var i;
			for (i = 0; i < favorites.length; i++) {
				if (favorites[i]._id === recipe._id) {
					console.log("DEBUG: Removing recipe from favorites: " + recipe.name);
					favorites.splice(i, 1);
					if (accountService.status.code === 1) console.log("WARN: Won't be removed from server");
					return false;
				}
			}

			console.log("DEBUG: Adding recipe to favorites: " + recipe.name);
			favorites.push(recipe);
			accountService.addFavorites(recipe);
			// currently saving to disk on every toggle
			this.setLocalFavorites(favorites);
			return true;
		},
		// addFavorites: function(recipe) {
		// 	if (favorites[recipe._id])
		// 		console.log("INFO: Recipe already existed");
		// 	else {
		// 		if (accountService.status.code === 1)
		// 			accountService.addFavorites(recipe);

		// 		console.log("INFO: Adding recipe to favorites: " + JSON.stringify(recipe));
		// 		favorites[recipe._id] = recipe;
		// 	}
		// },
		setLocalFavorites: function(_favorites_) {
			console.log("DEBUG: " + JSON.stringify(settingsService.settings));
			if (settingsService.settings.localStor === true)
				storageService.set("favorites", _favorites_);
			favorites = storageService.get("favorites");
			console.log("DEBUG: Saving favorites to storage");
		},
		getFavorites: function(callback) {
			var favoritesService = this;
			if (accountService.status.code === 1)
				accountService.getFavorites(function(_favorites_) {
					favoritesService.setFavorites(_favorites_);
					console.log("DEBUG: Processed favorites received");
					callback(_favorites_);
				});

			else callback(favorites);
		}
	};
});

