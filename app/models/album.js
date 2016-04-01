var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var album = mongoose.Schema({
    name        : String,
    image       : [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    user        : { type: Schema.Types.ObjectId, ref: 'User' },
    created_date: { type : Date, default: Date.now },
});

module.exports = mongoose.model('Album', album);
