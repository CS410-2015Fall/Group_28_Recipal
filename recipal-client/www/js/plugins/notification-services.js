"use strict";

angular.module('notification.services', ['settings.services'])
.factory('notificationService', ['$rootScope', 'settingsService', function($rootScope, settingsService) {
	var defaultTitle = 'Alarm went off!';
	//var defaultSound = 'res://alarm.mp3';
	return {
		status: function() {
			return $rootScope.deviceReady 
			&& $rootScope.deviceReady.isReady === true
			&& settingsService.notification.value === true;
		},
		schedule: function(options) {
			if (!this.status())
				return;

			console.log("DEBUG: Scheduling alarm " + options.id); 
			cordova.plugins.notification.local.schedule({
				id: options.id,
				title: defaultTitle,
				text: options.text,
				//sound: defaultSound,
				at: options.at
			});
		},
		cancel: function(id) {
			if (!this.status())
				return;
			console.log("DEBUG: Cancelling alarm " + id);
			cordova.plugins.notification.local.cancel(id);
		},
		cancelAll: function() {
			if (!this.status())
				return;
			console.log("DEBUG: Cancelling all alarms");
			cordova.plugins.notification.local.cancelAll();
		}
	};
}]);