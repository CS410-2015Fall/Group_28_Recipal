"use strict";

angular.module('settings.services', [])
.factory('settingsService', function() {
	return {
		toSaveLoginInfo: {username: true, password: false}
	}
});
