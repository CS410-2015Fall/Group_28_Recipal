"use strict";
/* 
id: unique id (int > 0)
name: name of recipe (str)
authorId: id of the Author object(int > 0)
category: Category object this recipe belongs to
ingredientArr: non-empty list of ingredient (element: str)
numSteps: number of cooking steps (int > 0)
*/
var recipe = {
	id: 0,
	name: "",
	authorId: 0,
	category: null,
	ingredientArr: [],
	numSteps: 0,
	recipe: function(id, name, authorId, category, ingredientArr, numSteps) {
		this.id = id;
		this.name = name;
		this.authorId = authorId;
		this.category = category;
		this.ingredientArr = ingredientArr;
		this.numSteps = numSteps;
	}
};

/*
regionArr: relative geographic origins of the food (element: str) // TODO: Map?
rating: rating of recipe, a percentage in decimal form (number 0.0->1.0)
difficulty: difficulty of recipe, a percentage in decimal form (number 0.0->1.0)
suggestedTime: suggested time in minutes to finish (int > 0) (TODO: scaled in terms of difficulty?)
timeOfDayArr: times of day the meal is normally eaten (element: int >= 0)
courseArr: the courses the meal is normally served as (element: int >= 0)
elements in timeOfDayArr and courseArr correspond to indices in 
	TIME_OF_DAY and COURSE, respectively
*/
var category = {
	regionArr: [],
	rating: 0.0,
	difficulty: 0.0,
	suggestedTime: 0,
	timeOfDayArr: [],
	courses: [],
	category: function(regions, rating, difficulty, suggestedTime, 
		timesOfDay, courses) {
		this.regions = regions;
		this.rating = rating;
		this.difficulty = difficulty;
		this.suggestedTime = suggestedTime;
		this.timesOfDay = timesOfDay;
		this.courses = courses;
	} 
};
//                  0             1        2
var TIME_OF_DAY = ["breakfast" , "lunch", "dinner"]; //ADD NEW ONES AT THE END!!!
//                  0          1          2          3
var COURSE = ["Appetizers", "Snacks", "Entrees", "Dessert"]; //ADD NEW ONES AT THE END!!!

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



