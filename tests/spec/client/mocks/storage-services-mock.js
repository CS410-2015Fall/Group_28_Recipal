"use strict";

angular.module('storage.services.mock', [])
.factory('storageService', function() {
	return {
		db: {},
		set: function(key, data) {
			console.log("DEBUG: Storing to storage - " + key + "\n" + JSON.stringify(data));
			 db[key] = data;
		},		
		get: function(key) {
			console.log("DEBUG: Retrieving from storage - " + key + "\n" + JSON.stringify($localStorage[key]));
			return db[key];
		},
		remove: function(key) {
			console.log("DEBUG: Deleting from storage - " + key + "\n" + JSON.stringify($localStorage[key]));
			delete db[key];
		}
	}
});
