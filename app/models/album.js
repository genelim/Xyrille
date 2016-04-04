var mongoose    = require('mongoose'),
    Image       = mongoose.model('Image').schema,
    Schema      = mongoose.Schema;

var album = mongoose.Schema({
    name        : String,
    image       : [Image],
    user        : { type: Schema.Types.ObjectId, ref: 'User' },
    created_date: { type : Date, default: Date.now },
});

module.exports = mongoose.model('Album', album);
