var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

//handles image upload
exports.image = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        var tempPath = file.path;
        var rename = makeid();
        var targetPath = path.resolve('./public/assets/images/upload/' + rename + 'xyrille' + file.name );
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err
            }
            return res.json({path: 'assets/images/upload/'+ rename + 'xyrille' + file.name })
        })
    });
};

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}