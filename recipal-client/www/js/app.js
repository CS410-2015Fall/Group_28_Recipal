"use strict"
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu.html'
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'views/login.html'
      }
    }
  })
  .state('app.createAccount', {
    url: '/login/create_account',
    views: {
      'menuContent': {
        templateUrl: 'views/create.html',
      }
    }
  })
  .state('app.forgotPassword', {
    url: '/login/forgot_password',
    views: {
      'menuContent': {
        templateUrl: 'views/forgot.html',
      }
    }
  })
  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'views/account.html',
          // controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.favorites', {
    url: '/favorites',
    views: {
      'menuContent': {
        templateUrl: 'views/favorites.html'
      }
    }
  })
  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'views/help.html'
      }
    }
  })
  .state('app.recipe', {
    url: '/recipe/:recipeId',
    views: {
      'menuContent': {
        templateUrl: 'views/recipe.html',
        controller: 'RecipeCtrl'
      }
    }
  });
  // // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/app/search');
});
