"use strict";

// Only add new ones at the end!
var TIME_OF_DAY_ARR = {breakfast: 0, lunch: 1, dinner: 2};
var COURSE_ARR = {appetizer: 0, snack: 1, entree: 2, dessert: 3};
var REGION_ARR = {};
var UPDATE_TYPE = {categories: 0, recipe: 1, account: 2};
var MAX_RATING = 5.0;
var MAX_DIFFICULTY = 5.0;

/* 
name: name of recipe (str)
authorName: name of the author (str)
categories: Categories object this recipe belongs to
steps: array of cooking Step objects
*/
// var recipe = {
// 	name: "",
// 	duration: 0,
// 	authorRef: "",
// 	rating: 0,
// 	difficulty: 0,
// 	ingredients: [""],
// 	categories: [""], // tags form
// 	steps: [new step()],
// 	recipe: function(name, authorRef, rating, difficulty, ingredients, categories, steps) {
// 		this.name = name;
// 		this.authorName = authorName;
// 		this.rating = rating;
// 		this.difficulty = difficulty;
// 		this.ingredients = ingredients;
// 		this.categories = categories;
// 		this.steps = steps;
// 	},
// 	numSteps: function() {
// 		return this.steps.size();
// 	}
// };

function Recipe(name, authorName, rating, difficulty, ingredients, categories, steps) {
		this.name = name;
		this.authorName = authorName;
		this.rating = rating;
		this.difficulty = difficulty;
		this.ingredients = ingredients;
		this.categories = categories;
		this.steps = steps;
}


/*
Category properties of a recipe
regionArr: relative geographic origins of the food (element: int >= 0) // TODO: Map?
rating: rating of recipe, a percentage in decimal form (number 0.0->1.0)
difficulty: difficulty of recipe, a percentage in decimal form (number 0.0->1.0)
suggestedTime: suggested time in minutes to finish (int > 0) (TODO: scaled in terms of difficulty?)
timeOfDayArr: times of day the meal is normally eaten (element: int >= 0)
courseArr: the courses the meal is normally served as (element: int >= 0)
ingredientArr: non-empty list of ingredient (element: str) 

Elements in regionArr, timeOfDayArr and courseArr corresponds to values in 
	3 enum-like objects with same name
Note: If browsing/searching for recipes, this object can also be used as criteria,
	so rating, difficulty and suggestedTime can become an array of 2 (a range)
// */
// var categories = {
// 	rating: 0.0,
// 	difficulty: 0.0,
// 	regionArr: [""],
// 	timeOfDayArr: [""],
// 	courses: [""],
// 	ingredientArr: [""],
// 	categories: function(regions, rating, difficulty, suggestedTime, 
// 		timesOfDay, courses) {
// 		this.regions = regions;
// 		this.rating = rating;
// 		this.difficulty = difficulty;
// 		this.suggestedTime = suggestedTime;
// 		this.timesOfDay = timesOfDay;
// 		this.courses = courses;
// 	}
// };

/* 
Search query
categories: search Categories object (see its Note section)
maxNumResults: max number of results to be returned by server
callback: invoked when receiving search results and result head,
	passing them as arguments
*/
// var query = {
// 	name: "",
// 	author: "",
// 	rating: {min: 0, max: 0},
// 	difficulty: {min: 0, max: 0},
// 	ingredients: [""],
// 	categories: [""], // tags form, 
// 	// maxNumResults: 0, 
// 	// callback: null,
// 	query: function(name, author, rating, difficulty, ingredients, categories) {
// 		this.name = name;
// 		this.author = author;
// 		this.rating = rating;
// 		this.difficulty = difficulty;
// 		this.ingredients = ingredients;
// 		this.categories = categories;
// 	}
// };

function Query(name, authorName, rating, difficulty, ingredients, categories) {
		this.name = name;
		this.authorName = authorName;
		this.rating = rating;
		this.difficulty = difficulty;
		this.ingredients = ingredients;
		this.categories = categories;
}

/*
"Header" of a returned search, contains the original search Query object, 
	and id of last recipe
TODO: use id array instead of sending the resultHead back and forth
*/
// var resultHead = {
// 	query: null,
// 	lastId: 0,
// 	result: function(query, lastId) {
// 		this.query = query;
// 		this.lastId = lastId;
// 	}
// };

/*
text: step description
mediaArr: list of Media objects
sysEventArr: list of SystemEvent objects to trigger (eg. timers, speakers,...)
toolTipArr: list of possible pop up ToolTip objects
// */ 
// var step = {
// 	text: "",
// 	media: [],
// 	sysEventArr: [],
// 	toolTipArr: [],
// 	step: function (text, mediaArr, sysEventArr, toolTipArr) {
// 		this.text = text;
// 		this.media = media;
// 		this.sysEvents = sysEvents;
// 		this.toolTips = toolTips;
// 	}
//};
function Step(instruction, timer, media, notes) {
		this.instruction = instruction;
		this.media = media;
		this.timer = timer;
		this.notes = notes;
}

// var media = {
// 	data: "",
// 	media: function(data) {
// 		this.data = data;
// 	}
// };

// // sysEvent.timer with id=<id> will elapse for <time> seconds;
// var sysEvent = {
// 	timer: {
// 		id: 0, 
// 		time: 0, 
// 		timer: function(id, time) {
// 			this.id = id;
// 			this.time = time;
// 		}
// 	},
// 	sysEvent: function(timer) {
// 		this.timer = timer;
// 	}
// };

// // Holding <word> will pop up a tooltip with content = <definition>
// var toolTip =  {
// 	word: "",
// 	definition: "",
// 	toolTip: function(word, definition) {
// 		this.word = word;
// 		this.definition = definition;
// 	}
// };

// var author = {
// 	id: 0,
// 	name: "",
// 	author: function(id, name) {
// 		this.id = id;
// 		this.name = name;
// 	}
// };

/*
updateType (int >= 0) corresponds to value of enum-like object
	with same name 
*/
// var infoUpdate = {
// 	updateType: 0,
// 	newInfo: null,
// 	infoUpdate: function(updateType, newInfo) {
// 		this.updateType = updateType;
// 		this.newInfo = newInfo;
// 	}
// };

function InfoUpdate(updateType, newInfo) {
		this.updateType = updateType;
		this.newInfo = newInfo;
}
