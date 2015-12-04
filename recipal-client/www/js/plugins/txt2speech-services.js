"use strict";

angular.module('txt2speech-services', ['settings.services'])
.factory('txt2speechService', ['$rootScope', 'settingsService', function($rootScope, settingsService) {
	return {
		speak: function(text) {
			if ($rootScope.deviceReady && $rootScope.deviceReady.isReady && settingsService.settings.speak)
				TTS.speak(text, function () {
					console.log("DEBUG: Spoke.");
				}, function (reason) {
					console.log("DEBUG: Failed to speak: " + reason);
				});
		},
		stop: function() {
			if ($rootScope.deviceReady && $rootScope.deviceReady.isReady)
				TTS.speak("", function () {
					console.log("DEBUG: Spoke.");
				}, function (reason) {
					console.log("DEBUG: Failed to speak: " + reason);
				});
		}
	};
}]);