var proxyquire = require('proxyquire'),
deepcopy = require('deepcopy'),
chai = require('chai'),
accountModelMock = require('./mocks/account-model-mock');

var accountLib = proxyquire('../../../recipal-server/lib/accountLib', {'../models/account': accountModelMock});
var expect = chai.expect;

// Need to globalize this or use another way
var request = {body: {}};
var respond = {
	code: -1,
	data: {},
	status: function(code) {
		this.code = code;
		return this;
	},
	send: function(data) {
		this.data = data;
		return this;
	}
}

describe('accountLib', function() {
	beforeEach(function() { accountModelMock.accounts = {}; });

	it('add new account success', function () {
      // First account
      var req = deepcopy(request);
      req.body = {username: "holy", email: "holy@recipal.ca"};

      var res = deepcopy(respond);
      accountLib.createAccount(req, res);

      expect(res.code).to.equal(200);
      expect(res.data.username).to.equal(req.body.username);
      expect(res.data.email).to.equal(req.body.email);

      // Second account
      req = deepcopy(request);
      req.body = {username: "monster", email: "monster@recipal.ca"};

      res = deepcopy(respond);
      accountLib.createAccount(req, res);

      expect(res.code).to.equal(200);
      expect(res.data.username).to.equal(req.body.username);
      expect(res.data.email).to.equal(req.body.email);
  });


	it('add duplicate account failed', function () {
      // First account
      accountModelMock.accounts["holy"] = {username: "holy", email: "another@recipal.ca"};

      // Duplicate account
      var req = deepcopy(request);
      req.body = {username: "holy", email: "another_holy@recipal.ca"};

      var res = deepcopy(respond);
      accountLib.createAccount(req, res);

      expect(res.code).to.equal(400);
      expect(res.data).to.equal("Account creation failed");
  });

	it('login success', function () {
      // Create account
      var account = {username: "holy", email: "holy@recipal.ca", password: "123456"};
      accountModelMock.accounts["holy"] = account;

      // Login
      var req = deepcopy(request);
      req.body = {username: "holy", password: "123456"};

      var res = deepcopy(respond);
      accountLib.login(req, res);
      expect(res.code).to.equal(200);
      expect(res.data.username).to.equal(account.username);
      expect(res.data.password).to.equal(account.password);
      expect(res.data.email).to.equal(account.email);
  });

	it('login failed non-exist', function () {
      // Login
      var req = deepcopy(request);
      req.body = {username: "holy", password: "123456"};

      var res = deepcopy(respond);
      accountLib.login(req, res);

      expect(res.code).to.equal(400);
      expect(res.data).to.be.undefined;
  });


	it('login failed wrong password', function () {
      // Create account
      accountModelMock.accounts["holy"] = {username: "holy", email: "holy@recipal.ca", password: "123456"};

      // Login
      var req = deepcopy(request);
      req.body = {username: "holy", password: "123466"};

      var res = deepcopy(respond);
      accountLib.login(req, res);

      expect(res.code).to.equal(400);
      expect(res.data).to.equal("Incorrect credentials");
  });
});