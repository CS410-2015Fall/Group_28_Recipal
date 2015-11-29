"use strict";

describe('account', function() {
    beforeEach(module('account.services'));
    beforeEach(module('settings.services.mock'));
    beforeEach(module('socket.services.mock'));

    var $httpBackend;
    var socketService;
    var accountService;
    var settingsService;
    var $rootScope;

    var accountInfo = {username: "holy", email: "holy@recipal.com", password: "123456"};
    var guestInfo = {name: "Guest"};

    beforeEach(inject(function(_socketService_, _accountService_, _settingsService_, _$rootScope_, $injector) {
        accountService =_accountService_;
        settingsService = _settingsService_;
        socketService = _socketService_;
        $rootScope = _$rootScope_;
        $httpBackend = $injector.get("$httpBackend");

        socketService.url = "";
    }));

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
 });

    it('http login failed', function() {
        angular.copy(guestInfo, accountService.accountInfo);
        accountService.status = {code: 0, error: ""};

        $httpBackend.when('POST', '/login').respond(401, '');
        $httpBackend.expectPOST('/login');

        accountService.login({}, function() {}, function() {});
        $httpBackend.flush();

        expect(JSON.stringify(accountService.status)).toEqual(JSON.stringify({code: 0, error: "Log in failed"}));
        expect(JSON.stringify(accountService.accountInfo)).toEqual(JSON.stringify({name: "Guest"}));
    });

    it('http login success', function() { 
        angular.copy(guestInfo, accountService.accountInfo);
        accountService.status = {code: 0, error: ""};

        var loginData = {username: "holy", password: "123456"};

        $httpBackend.when('POST', '/login').respond(200, accountInfo);
        $httpBackend.expectPOST('/login', loginData);

        accountService.login(loginData, function() {}, function() {});
        $httpBackend.flush();

        expect(JSON.stringify(accountService.status)).toEqual(JSON.stringify({code: 1, error: "Log in successful"}));
        expect(JSON.stringify(accountService.accountInfo)).toEqual(JSON.stringify(accountInfo));
    });

     it('http create account failed', function() {
        angular.copy(guestInfo, accountService.accountInfo);
        accountService.status = {code: 0, error: ""};

        $httpBackend.when('POST', '/createAccount').respond(401, '');
        $httpBackend.expectPOST('/createAccount');

        accountService.createAccount({}, function() {}, function() {});
        $httpBackend.flush();

        expect(accountService.status.error).toEqual("Create account failed");
    });

    it('http create account success', function() { 
        angular.copy(guestInfo, accountService.accountInfo);
        accountService.status = {code: 0, error: ""};

        var createData = accountInfo;
        $httpBackend.when('POST', '/createAccount').respond(200, accountInfo);
        $httpBackend.expectPOST('/createAccount', createData);

        accountService.createAccount(createData, function() {}, function() {});
        $httpBackend.flush();

        expect(accountService.status.error).toEqual("Create account successful");
    });

    it('logout without save', function() { 
        angular.copy(accountInfo, accountService.accountInfo);
        accountService.status = {code: 1, error: ""};
        settingsService.saveLoginInfo = {username: false, password: false};
        
        accountService.logout();
        
        expect(JSON.stringify(accountService.accountInfo)).toEqual(JSON.stringify({name: "Guest"}));
        expect(JSON.stringify(accountService.status)).toEqual(JSON.stringify({code: 0, error: "Log out successful"}));
    });

        it('logout with save username only', function() {
        angular.copy(accountInfo, accountService.accountInfo);
        accountService.status = {code: 1, error: ""};
        settingsService.saveLoginInfo = {username: true, password: false};

        accountService.logout();
       
        expect(JSON.stringify(accountService.accountInfo)).toEqual(JSON.stringify({name: "Guest", username: accountInfo.username}));
        expect(JSON.stringify(accountService.status)).toEqual(JSON.stringify({code: 0, error: "Log out successful"}));
    });

});