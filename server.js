var express        = require('express'),
    app            = express(),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 1000,
    db = require('./config/db');
    
mongoose.connect(db.url); 

app.use(bodyParser.json()); 
app.use(session({secret: 'this is multivendor', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use('/app', express.static(__dirname + '/public/app'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/libs', express.static(__dirname + '/public/libs'));
require('./app/routes')(app); 
app.all('/*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
}); 

app.listen(port);	
console.log('Magic happens on port ' + port);