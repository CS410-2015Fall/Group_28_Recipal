"use strict";

angular.module('favorites.services', ['socket.services', 'settings.services', 'storage.services', 'account.services'])
.factory('favoritesService', function($http, socketService, settingsService, storageService, accountService) {
	var favorites = [];
	return {
		init: function() {
			if (settingsService.settings.localStor) {
				var savedFavorites = storageService.get("favorites");
				if (savedFavorites)
					favorites = storageService.get("favorites");
			}
			else 
				storageService.remove("favorites");
		},
		toggleFavorite: function(recipe) {
			var i;
			for (i = 0; i < favorites.length; i++) {
				if (favorites[i]._id === recipe._id) {
					console.log("DEBUG: Removing recipe from favorites: " + recipe.name);
					favorites.splice(i, 1);
					if (accountService.status.code === 0) {
						console.log("WARN: Won't be removed from server");
					} else {
						accountService.removeFavorites(recipe);
					}
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
		setLocalFavorites: function(_favorites_) {
			if (settingsService.settings.localStor === true)
				storageService.set("favorites", _favorites_);
			favorites = storageService.get("favorites");
		},
		// Get favorites from server and compare with local, local with remote if duplicated,
		// else upload local to server and add remote to local storage 
		getFavorites: function(callback) {
			var favoritesService = this;
			if (accountService.status.code === 1)
				accountService.getFavorites(function(_favorites_) {
					// TODO: better way to do this?
					var i;
					for (i = 0; i < favorites.length; i++) {
						var j;
						for (j = 0; j < _favorites_.length; j++) {
							// Override local if equals
							if (favorites[i]._id === _favorites_[j]._id) {
								favorites[i] = _favorites_[j];
								_favorites_.splice(j--, 1);
								break;
							}
						}
						// Upload unique locals
						if (j === _favorites_.length)
							accountService.addFavorites(favorites[i]);
					}
					// Concat the rest of remote and put to local storage
					favorites = favorites.concat(_favorites_);
					favoritesService.setLocalFavorites(favorites);
					callback(favorites);
				});

			else callback(favorites);
		}
	};
});

