var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var debug = require('debug')('musicSchool'); // don't know how to use this yet...
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

// set up the database =====================
var db = mongoose.connect('mongodb://localhost/musicSchoolDB');

app.use(express.static(__dirname + '/public')); // set up the app to use HTML as view engine

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({
    secret: "supersecretkey",
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        db: 'sessionStore'
    })
}));

app.use(favicon(__dirname + '/public/images/favicon.ico'));


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var router = require('./routes/router');
router(app);
// set up the port and start up the server
app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
