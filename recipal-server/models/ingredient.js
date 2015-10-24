var mongoose  = require('mongoose');
var log       = require('winston');

IngredientSchema = mongoose.Schema({
    name:           String, 
    details:        String,
    dateCreated:    { type: Date, default: Date.now }
});

IngredientSchema.statics.addIngredient = function(name, details, done) {
    var Ingredient = this;
    return Ingredient.create({
        name       :    name,
        details    :    details,
    }, function(err, object) {
        if(err) 
            log.error('Unable to create Ingredient object:%s', err);
        done(err, object);
    });
};


var Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;