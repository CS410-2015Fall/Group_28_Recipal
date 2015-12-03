"use strict";

angular.module('settings.services', ['storage.services'])
.factory('settingsService', ['storageService', function(storageService) {
	var defaultSettings = {saveUsername: true, rememberMe: false,
		voiceRecog: false,
		notification: true,
		localStor: true};
	var watchers = {};
	return {
		settings: defaultSettings,
		init: function() {
			var savedSettings = storageService.get("settings");
			if (!savedSettings) {
				console.log("Could not load local saved settings, using default");
				storageService.set("settings", this.settings);
			}
			else {
				this.settings = savedSettings;
				//console.log("DEBUG: Got settings from storage: " + JSON.stringify(this.settings));
			}
		}
	}
}]);
