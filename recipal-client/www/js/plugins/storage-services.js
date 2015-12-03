"use strict";

angular.module('storage.services', ['ngStorage'])
.factory('storageService', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage) {
	return {
		set: function(key, data) {
			console.log("DEBUG: Storing to storage - " + key + "\n" + JSON.stringify(data));
			 $localStorage[key] = data;
		},		
		get: function(key) {
			console.log("DEBUG: Retrieving from storage - " + key + "\n" + JSON.stringify($localStorage[key]));
			return $localStorage[key];
		},
		remove: function(key) {
			console.log("DEBUG: Not supported ");
		}
	}
}]);
