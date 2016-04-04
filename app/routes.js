var user            = require('./controllers/user'),
    photo           = require('./controllers/photo'),
    upload           = require('./controllers/upload'),
    path            = require('path'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;
    
require('../config/passport')(passport);

module.exports = function(app) {    
    app.post('/api/register', passport.authenticate('local-register'), user.register);
    app.post('/api/login', passport.authenticate('local-login'), user.login);
    app.post('/api/user/details', user.user_details);
    app.post('/api/user/logout', user.logout);
    
    app.post('/api/album', photo.create_album);
    app.get('/api/album/:id', photo.get_album);
    app.put('/api/album', photo.update_album);
    app.delete('/api/album/:id', photo.delete_album);
    
    app.post('/api/upload', upload.image);
    
    app.post('/api/image', photo.add_image);
    
};

