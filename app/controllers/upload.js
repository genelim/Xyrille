var formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    gm = require('gm');
    
exports.image = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        var tempPath = file.path;
        
        var rename = makeid();
        var targetPath = path.resolve('./public/assets/images/upload/fullsize/pixylle-' + rename + file.name );
       
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err
            }
            gm(targetPath)
            .resize(null, 500)
            .noProfile()
            .write(path.resolve('./public/assets/images/upload/thumbnail/pixylle-' + rename + file.name ), function (err) {
                if (!err){
                    res.json({url_thumbnail: 'assets/images/upload/thumbnail/pixylle-' + rename + file.name , 
                            url_full: 'assets/images/upload/fullsize/pixylle-' + rename + file.name }) 
                }else{
                    res.json({response: 'Error compressing image'})
                }                
            });
        })
    });
};

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}