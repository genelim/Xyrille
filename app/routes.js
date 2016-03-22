var user        = require('./controllers/user'),
    path        = require('path'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    
require('../config/passport')(passport);

module.exports = function(app) {
    app.use(passport.initialize());
    app.post('/api/user', passport.authenticate('local-register'), user.register);
    
    app.get('/subdomain/blog/', function(request, response) {
        response.sendFile(path.resolve('blog/index.html'));
    });
};

