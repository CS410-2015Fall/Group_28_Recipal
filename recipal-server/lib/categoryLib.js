var Category = require("../models/category");

exports.addCategory = function(req, res) {
    var name       =    req.body.name;
    var description =    req.body.description;
    
	Category.addCategory(name, description, function(err, category){
		if (err) {
    		console.log("error creating category: " + err);
    		res.status(400).send();
    	} else {
    		res.status(200).send(category);
    	}
	});
}