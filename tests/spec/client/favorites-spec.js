"use strict";

describe('favorites', function() {
    beforeEach(module('account.services.mock'));
    beforeEach(module('settings.services'));
    beforeEach(module('storage.services.mock'));
    beforeEach(module('favorites.services'));

    var accountService;
    var settingsService;
    var storageService;
    var favoritesService;
    var $rootScope;

    beforeEach(inject(function(_storageService_, _accountService_, _settingsService_, _$rootScope_, $injector, _favoritesService_) {
        accountService =_accountService_;
        settingsService = _settingsService_;
        $rootScope = _$rootScope_;
        settingsService.settings= {};
        favoritesService = _favoritesService_;
    }));

    it('set/get favorites no remote no storage', function() { 
        accountService.status.code = 0;
        favoritesService.setLocalFavorites([{name: "pizza", _id: "15"}, {name: "bower", _id: "9"}]);
        
        var received = false;
        favoritesService.getFavorites(function(favorites) {
            expect(favorites.length).toEqual(2);
            expect(favorites[0]).toEqual({name: "pizza", _id: "15"});
            expect(favorites[1]).toEqual({name: "bower", _id: "9"});
            received = true;
        });
        expect(received).toBe(true);
    });


    it('toggleFavorites turn on no remote no storage', function() { 
        accountService.status.code = 0;
        favoritesService.setLocalFavorites([{name: "pizza", _id: "15"}]);
        favoritesService.toggleFavorite({name: "bower", _id: "9"});

        var received = false;
        favoritesService.getFavorites(function(favorites) {
            expect(favorites.length).toEqual(2);
            expect(favorites[0]).toEqual({name: "pizza", _id: "15"});
            expect(favorites[1]).toEqual({name: "bower", _id: "9"});
            received = true;
        });
        expect(received).toBe(true);
    });


    it('toggleFavorites turn off no remote no storage', function() { 
        accountService.status.code = 0;
        favoritesService.setLocalFavorites([{name: "pizza", _id: "15"}, {name: "bower", _id: "9"}]);
        favoritesService.toggleFavorite({name: "bower", _id: "9"});

        var received = false;
        favoritesService.getFavorites(function(favorites) {
            expect(favorites.length).toEqual(1);
            expect(favorites[0]).toEqual({name: "pizza", _id: "15"});
            received = true;
        });
        expect(received).toBe(true);
    });
});