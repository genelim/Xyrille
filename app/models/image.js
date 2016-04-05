var mongoose = require('mongoose');

var image = mongoose.Schema({
    url_full        : String,
    url_thumbnail   : String,
    caption         : String,
    star            : Boolean,
    created_date    : { type : Date, default: Date.now }
		
});

module.exports = mongoose.model('Image', image);
