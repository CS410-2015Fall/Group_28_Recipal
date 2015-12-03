"use strict";

angular.module('storage.services', ['ngStorage'])
.factory('storageService', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage) {
	return {
		set: function(key, data) {
			console.log("DEBUG: Storing " + key + " : " + JSON.stringify(data));
			 //$window.localStorage.setItem(JSON.stringify(key), JSON.stringify(data));
			 //return this.get(key) === data;
			 $localStorage.key = data;
		},		
		get: function(key) {
			console.log("DEBUG: Retrieving " + key);
			//return JSON.parse($window.localStorage.getItem(JSON.stringify(key)));
			return $localStorage.key;
		},
		remove: function(key) {
			console.log("DEBUG: Not supported ");
			//$window.localStorage.removeItem(key);
			//return this.get(key) === null;
		}
	}
}]);
