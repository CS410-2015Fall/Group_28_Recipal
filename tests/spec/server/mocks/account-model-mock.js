var accountModelMock = {
	accounts: {},
	addAccount: function(username, password, name, email, gender, age, level, callback) {
		if (!this.accounts[username]) {
			this.accounts[username] = {username: username, password: password,
				name: name, email: email, gender: gender, age: age, level: level};
			callback(false, this.accounts[username]);
		}
		else callback(true, {});
	},
	find: function(query, callback) {
		if (!this.accounts[query.username])
			callback(true);
		else if (this.accounts[query.username].password !== query.password)
			callback(false, []);
		else callback(false, [this.accounts[query.username]]);
	},
}

module.exports = accountModelMock;