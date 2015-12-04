angular.module('webFrontEnd').controller('addRecipeController', ['$http', 
    function($http) {
    	var ctrl = this;
    	ctrl.name = "";
    	ctrl.difficulty = 0;
    	ctrl.duration = 0;
    	ctrl.ingredients = [];
    	ctrl.categories = [];
    	ctrl.steps = [];

    	ctrl.addStep = function() {
    		ctrl.steps.push({});
    		console.log(ctrl.name);
    	}

    	ctrl.submitRecipe = function() {
    		var ingredients = ctrl.ingredients.split(',');
    		var categories = ctrl.categories.split(',');
    		var data = {
                    name: ctrl.name,
                    difficulty: ctrl.difficulty,
                    duration: ctrl.duration,
                    ingredients: ingredients,
                    categories: categories,
                    steps: ctrl.steps,
                    image: ctrl.image,
                };
            console.log("data is " + JSON.stringify(data));
    		var postReq = {
                method: 'POST',
                url: '/createRecipe',
                data: data,
            }
            $http(postReq).success(function(data) {
            	console.log("added recipe yay " + data);
            });
    	}
	}
]);