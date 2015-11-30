var mongoose  = require('mongoose');
var log       = require('winston');
var account   = require('./account');
var category  = require('./category');
var ingredient  = require('./ingredient');

RecipeSchema = mongoose.Schema({
    name:           String, 
    // duration in seconds
    duration:       Number,
    // 0 to 5
    difficulty:     Number,
    rating:         {},
    steps:          [],
    ingredients:    [String],
    categories:     [String],
    accountRef:     String,
    dateCreated:    { type: Date, default: Date.now }
});

RecipeSchema.statics.addRecipe = function(name, duration, difficulty, rating, steps, ingredients, categories, accountRef, done) {
    var Recipe = this;
    return Recipe.create({
        name       :    name,
        duration   :    duration,
        difficulty :    difficulty,
        rating     :    rating,
        steps      :    steps,
        ingredients:    ingredients,
        categories :    categories,
        accountRef :    accountRef,
    }, function(err, object) {
        if(err) 
            log.error('Unable to create Recipe object:%s', err);
        done(err, object);
    });
};


var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
