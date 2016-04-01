var mongoose = require('mongoose');

var image = mongoose.Schema({
    name        : String,
    created_date: { type : Date, default: Date.now }
		
});

module.exports = mongoose.model('Image', image);
