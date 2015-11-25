"use strict";

angular.module('settings.services', [])
.factory('settingsService', function() {
	return {
		saveLoginInfo: {username: true, password: false},
		voiceRecog: {value: false},
		notification: {value: true},
		cache: {value: false}
	}
});
