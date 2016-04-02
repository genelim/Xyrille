var User    = require('../models/user.js'),
    Image   = require('../models/image.js'),
    Album   = require('../models/album.js');

exports.create_album = function (req, res) {
    var new_album = new Album();
    
    new_album.name = req.body.name;
    new_album.user = req.body.user;
    
    new_album.save(function(error, album){
        if(error){
            res.json({response : "Server Error"})
        }else{
            res.json({response : album})
        }
    })
};

exports.get_album = function (req, res) {
    Album.find({user : req.params.id})
    .exec(function(error, albums){
        if(error){
            res.json({response : "Server Error"})
        }else{
            res.json({response : albums})            
        }
    })
};

exports.update_album = function (req, res) {
    Album.findOne({_id : req.body._id})
    .exec(function(error, albums){
        if(error){
            res.json({response : "Server Error"})
        }else if(!albums){
            res.json({response : "No Album Found"})            
        }else if(albums){
            albums.name = req.body.name;
            albums.save(function(err,updated){
                if(err){
                    res.json({response : "Server Error"})      
                }else{
                    res.json({response : updated})            
                }
            })
        }
    })
};


exports.delete_album = function (req, res) {
    Album.find({ _id : req.params.id })
    .remove()
    .exec(function(err, result){
        if(err){
            res.json({response : "Server Error"})
        }else{
            res.json({response: result})
        }
    });
};