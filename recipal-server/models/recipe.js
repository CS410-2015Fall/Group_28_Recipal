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
    rating:         Number,
    steps:          [],
    ingredients:    [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
    categories:     [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    accountRef:     { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    dateCreated:    { type: Date, default: Date.now }
});

RecipeSchema.statics.addRecipe = function(name, duration, difficulty, rating, steps, categories, accountRef, done) {
    var Recipe = this;
    return Recipe.create({
        name       :    name,
        duration   :    duration,
        difficulty :    difficulty,
        rating     :    rating,
        steps      :    steps,
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