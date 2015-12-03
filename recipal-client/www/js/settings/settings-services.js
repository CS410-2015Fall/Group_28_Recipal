"use strict";

angular.module('settings.services', ['storage.services'])
.factory('settingsService', ['storageService', function(storageService) {
	var settings = {saveLoginInfo: {username: true, password: false},
		voiceRecog: {value: false},
		notification: {value: true},
		localStor: {value: false}};

	return {
		settings: settings,
		init: function() {
			var savedSettings = storageService.get("settings");
			if (!savedSettings) {
				console.log("Could not load local saved settings, using default");
				return;
			}
			
			this.settings = savedSettings;
		},
		saveAllSettings: function() {
			//if (!storageService.set("settings", this.settings))
				//console.log("Failed to save settings locally");
				storageService.set("settings", this.settings);
		}
	}
}]);
