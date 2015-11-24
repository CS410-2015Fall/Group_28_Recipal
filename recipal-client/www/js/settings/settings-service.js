"use strict";

angular.module('settings.services', [])
.factory('settingsService', function() {
	return {
		saveLoginInfo: {username: true, password: false},
		voiceRecognition: {value: false},
		notification: {value: false}
	}
});
