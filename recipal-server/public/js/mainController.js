angular.module('webFrontEnd').controller('mainController', ['$http', '$rootScope',
    function($http, $rootScope) {
        var ctrl = this;
        ctrl.loggedIn = false;
        ctrl.login = function() {
            var data = {
                    username: ctrl.username,
                    password: ctrl.password,
                };
            console.log("data is " + JSON.stringify(data));
            var postReq = {
                method: 'POST',
                url: '/login',
                data: data,
            }
            $http(postReq).success(function(data) {
                $rootScope.username = data.username;
                ctrl.loggedIn = true;

                ctrl.getRecipes();
            });
        }
        ctrl.recipes = {};
        ctrl.getRecipes = function() {
            var postReq = {
                method: 'POST',
                url: '/getRecipeAuthor',
                data: {author: $rootScope.username},
            }
            $http(postReq).success(function(data) {
                $rootScope.recipes = data;
                console.log("recipes for user is " + data);
                ctrl.recipes = data;
            });
        }

        ctrl.addRecipe = false;
        ctrl.updateRecipe = false;
        ctrl.updateOneRecipe = false;

        ctrl.toggleAdd = function() {
            ctrl.addRecipe = true;
            ctrl.updateRecipe = false;
            ctrl.updateOneRecipe = false;
        }

        ctrl.toggleUpdate = function() {
            ctrl.getRecipes();
            ctrl.addRecipe = false;
            ctrl.updateRecipe = true;
            ctrl.updateOneRecipe = false;
        }

        ctrl.toggleOneUpdate = function() {
            ctrl.addRecipe = false;
            ctrl.updateRecipe = false;
            ctrl.updateOneRecipe = true;
        }


    }
]);