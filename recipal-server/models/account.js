var mongoose  = require('mongoose');
var log       = require('winston');

AccountSchema = mongoose.Schema({
    username:      {type: String, required: true, index:{unique:true}},
    password:      {type: String, required: true},
    name:          {type: String, required: true, index:{unique:true}},
    gender:        String,
    age:           Number,
    email:         String,
    dateCreated:   { type: Date, default: Date.now }, 
    // 0 = normal, 1 = premium, 2 = super premium, 3 = admin
    level:         { type: Number, default: 0}
});

AccountSchema.statics.addAccount = function(username, password, name, email, gender, age, level, done) {
    var Account = this;
    //console.log("level is " + level );
    return Account.create({
        username: username,
        password: password,
        name: name,
        email: email,
        gender: gender,
        age: age,
        level: level
    }, function(err, object) {
        if(err) 
            log.error('Unable to create Account object:%s', err);
        done(err, object);
    });
};


var Account = mongoose.model("Account", AccountSchema);
module.exports = Account;