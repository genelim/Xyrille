var user        = require('./controllers/user'),
    path        = require('path'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    
require('../config/passport')(passport);

module.exports = function(app) {    
    app.post('/api/register', passport.authenticate('local-register'), user.register);
    app.post('/api/login', passport.authenticate('local-login'), user.login);
    app.post('/api/user/details', user.user_details);
    app.post('/api/user/logout', user.logout);
    
    app.get('/subdomain/blog/', function(request, response) {
        response.sendFile(path.resolve('blog/index.html'));
    });
};

