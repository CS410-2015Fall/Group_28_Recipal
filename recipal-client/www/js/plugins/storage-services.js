"use strict";

angular.module('storage.services', ['ngStorage'])
.factory('storageService', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage) {
	return {
		set: function(key, data) {
			console.log("DEBUG: Storing " + key + " : " + JSON.stringify(data));
			 $localStorage[key] = data;
		},		
		get: function(key) {
			console.log("DEBUG: Retrieving " + key);
			return $localStorage[key];
		},
		remove: function(key) {
			console.log("DEBUG: Not supported ");
		}
	}
}]);
