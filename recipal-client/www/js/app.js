"use strict";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'socket.services', 'search.controllers', 'account.loginControllers', 
  'account.profileControllers', 'recipe.controllers', 'menu.controllers', 
  'favorites.controllers', 'favorites.services', 'settings.services', 'account.services'])

.run(function($ionicPlatform, $rootScope, socketService, settingsService, favoritesService, accountService) {
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

  // TODO: consider moving this into a service
  if (window.cordova && cordova.plugins) {
    $rootScope.deviceReady = {isReady: true};
    console.log("DEBUG: Device ready.");
  }

 // socketService.connect("/");
  settingsService.init();
  accountService.init();
  favoritesService.init();
});
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'MenuCtrl'
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
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.createAccount', {
    url: '/login/create_account',
    views: {
      'menuContent': {
        templateUrl: 'views/create.html',
        controller: 'CreateAccountCtrl'
      }
    }
  })
  .state('app.forgotPassword', {
    url: '/login/forgot_password',
    views: {
      'menuContent': {
        templateUrl: 'views/forgot.html',
        //controller: 'ForgotPassCtrl'
      }
    }
  })
  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('app.favorites', {
    url: '/favorites',
    views: {
      'menuContent': {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl'
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
    url: '/recipe',
    views: {
      'menuContent': {
        templateUrl: 'views/recipe.html',
        controller: 'RecipeCtrl'
      }
    }
  });


  $urlRouterProvider.otherwise('/app/search');
});
