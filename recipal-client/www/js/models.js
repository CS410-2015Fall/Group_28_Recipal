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
//  dateCreated: new Date(),
// 	authorName: "",
// 	rating: 0,
// 	difficulty: 0,
// 	ingredients: [""],
// 	categories: [""], // tags form
// 	steps: [new step()],
// };

function Recipe(name, author, duration, dateCreated, rating, difficulty, ingredients, categories, steps) {
		this.name = name;
		this.author = author;
		this.duration = duration;
		this.dateCreated = dateCreated;
		this.rating = rating;
		this.difficulty = difficulty;
		this.ingredients = ingredients;
		this.categories = categories;
		this.steps = steps;
}

/* 
Search query, arguments correspond to Recipe's arguments of same name
*/
// var query = {
// 	name: "",
// 	author: "",
// 	rating: {min: 0, max: 0},
// 	difficulty: {min: 0, max: 0},
// 	ingredients: [""],
// 	categories: [""], // tags form
// };

function Query(name, author, rating, difficulty, ingredients, categories) {
		this.name = name;
		this.authorName = author;
		this.rating = rating;
		this.difficulty = difficulty;
		this.ingredients = ingredients;
		this.categories = categories;
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
