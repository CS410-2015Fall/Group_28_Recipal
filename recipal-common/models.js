"use strict";

// Only add new ones at the end!
var TIME_OF_DAY_ARR = {breakfast: 0, lunch: 1, dinner: 2};
var COURSE_ARR = {appetizer: 0, snack: 1, entree: 2, dessert: 3};
var REGION_ARR = {};
var UPDATE_TYPE = {categories: 0, recipe: 1, account: 2};

/* 
id: unique id (int > 0)
name: name of recipe (str)
authorId: id of the Author object(int > 0)
categories: Categories object this recipe belongs to
ingredientArr: non-empty list of ingredient (element: str) TODO: not putting ingredient in categories means cannot browse recipe by ingredients (have to search using keywords)
numSteps: number of cooking steps (int > 0)
*/
var recipe = {
	id: 0,
	name: "",
	authorId: 0,
	categories: null,
	ingredientArr: [],
	numSteps: 0,
	recipe: function(id, name, authorId, categories, ingredientArr, numSteps) {
		this.id = id;
		this.name = name;
		this.authorId = authorId;
		this.categories = categories;
		this.ingredientArr = ingredientArr;
		this.numSteps = numSteps;
	}
};

/*
Category property of a recipe
regionArr: relative geographic origins of the food (element: int >= 0) // TODO: Map?
rating: rating of recipe, a percentage in decimal form (number 0.0->1.0)
difficulty: difficulty of recipe, a percentage in decimal form (number 0.0->1.0)
suggestedTime: suggested time in minutes to finish (int > 0) (TODO: scaled in terms of difficulty?)
timeOfDayArr: times of day the meal is normally eaten (element: int >= 0)
courseArr: the courses the meal is normally served as (element: int >= 0)

Elements in regionArr, timeOfDayArr and courseArr corresponds to values in 
	3 enum-like objects with same name
Note: If browsing/searching for recipes, this object can also be used as criteria,
	so rating, difficulty and suggestedTime can become an array of 2 (a range)
*/
var categories = {
	regionArr: [],
	rating: 0.0,
	difficulty: 0.0,
	suggestedTime: 0,
	timeOfDayArr: [],
	courses: [],
	categories: function(regions, rating, difficulty, suggestedTime, 
		timesOfDay, courses) {
		this.regions = regions;
		this.rating = rating;
		this.difficulty = difficulty;
		this.suggestedTime = suggestedTime;
		this.timesOfDay = timesOfDay;
		this.courses = courses;
	} 
};

/* 
Search query
categories: search Categories object (see its Note section)
maxNumResults: max number of results to be returned by server
callback: invoked when receiving search results and result head,
	passing them as arguments
*/
var query = {
	categories: null, 
	maxNumResults: 0, 
	callback: null,
	query: function(categories, maxNumResults, callback) {
		this.categories = categories;
		this.maxNumResults = maxNumResults;
		this.callback = callback;
	}
};

/*
"Header" of a returned search, contains the original search Query object, 
	and id of last recipe
TODO: use id array instead of sending the resultHead back and forth
*/
var resultHead = {
	query: null,
	lastId: 0,
	result: function(query, lastId) {
		this.query = query;
		this.lastId = lastId;
	}
};

/*
text: step description
mediaArr: list of Media objects
sysEventArr: list of SystemEvent objects to trigger (eg. timers, speakers,...)
toolTipArr: list of possible pop up ToolTip objects
*/ 
var step = {
	text: "",
	mediaArr: [],
	sysEventArr: [],
	toolTipArr: [],
	step: function (text, mediaArr, sysEventArr, toolTipArr) {
		this.text = text;
		this.media = media;
		this.sysEvents = sysEvents;
		this.toolTips = toolTips;
	}
};

var media = {
	data: "",
	media: function(data) {
		this.data = data;
	}
};

// sysEvent.timer with id=<id> will elapse for <time> seconds;
var sysEvent = {
	timer: {
		id: 0, 
		time: 0, 
		timer: function(id, time) {
			this.id = id;
			this.time = time;
		}
	},
	sysEvent: function(timer) {
		this.timer = timer;
	}
};

// Holding <word> will pop up a tooltip with content = <definition>
var toolTip =  {
	word: "",
	definition: "",
	toolTip: function(word, definition) {
		this.word = word;
		this.definition = definition;
	}
};

var author = {
	id: 0,
	name: "",
	author: function(id, name) {
		this.id = id;
		this.name = name;
	}
};

/*
updateType (int >= 0) corresponds to value of enum-like object
	with same name 
*/
var infoUpdate = {
	updateType: 0,
	newInfo: null,
	infoUpdate: function(updateType, newInfo) {
		this.updateType = updateType;
		this.newInfo = newInfo;
	}
};
