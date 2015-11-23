var mongoose  = require('mongoose');
var log       = require('winston');

CategorySchema = mongoose.Schema({
    name:           {type: String, required: true, index:{unique:true}}, 
    details:        String,
    dateCreated:    { type: Date, default: Date.now }
});

CategorySchema.statics.addCategory = function(name, details, done) {
    var Category = this;
    return Category.create({
        name       :    name,
        details    :    details,
    }, function(err, object) {
        if(err) 
            log.error('Unable to create Category object:%s', err);
        done(err, object);
    });
};


var Category = mongoose.model("Category", CategorySchema);
module.exports = Category;