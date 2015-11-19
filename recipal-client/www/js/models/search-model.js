"use strict";
// TODO: Cache? Concurrency issue?
var searchModel = {
	searchResults: [],
	updateListeners: [],
	setResults: function(recipeArr) { 
		this.searchResults = recipeArr;
		this.updateNotify();
	},
	getResults: function() { return this.searchResults; },
	updateSubscribe: function(handler) {
		this.updateListeners.push(handler); 
	},
	updateNotify: function() {
		for	(var i = 0; i < this.updateListeners.length; i++) {
			this.updateListeners[i]();
		}
	}
};