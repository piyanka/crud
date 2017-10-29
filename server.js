var express = require('express');
var app = express();
var port = process.env.PORT || 8000;


var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var mongoose = require ('mongoose');
var mongodb = require('mongodb');
var morgan = require('morgan');


//database

var configDB = require('./config/database.js');
mongoose.connect (configDB.url);
require('./config/passport')(passport);

//midleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'anystringoftext' ,
				saveUnitialized: true,
				resave: true}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
require('./config/passport')(passport);

app.set('view engine' ,'ejs');
require('./app/routes.js')(app,passport);

//port
app.listen(port);
console.log('server is listening in http://localhost:',+port);
