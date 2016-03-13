var express = require('express'),
	app = express(),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	port = process.env.PORT || 8080;
    
    var subdomainOptions = {
        base: 'localhost' //base is required, you'll get an error without it.
    };

    app.use(require('subdomain')(subdomainOptions));

app.use('/app', express.static(__dirname + '/public/app'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/libs', express.static(__dirname + '/public/libs'));

app.get('/subdomain/blog/', function(request, response) {
    response.sendFile('/blog/index.html', { root: __dirname });
});

app.all('/*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});