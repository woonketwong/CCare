/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config.js');
var router = require('./config/routes.js');
var mongoose = require('mongoose');
var util = require('util');
var Passports = require("passports");
var Passport = require("passport").Passport;
var port = process.env.PORT || 5000;
var app = express();
var fs = require('fs');
var flash = require("connect-flash");
var _= require("underscore");

////////////////////////////////////////
//Database initialization
////////////////////////////////////////

var passports = new Passports();

passports._getConfig = function _getConfig(req, cb) {
  return cb(null, req.host, {
    realm: req.host,
  });
};

var createInstance = function _createInstance() {
  var instance = new Passport();

  // instance.use("basic", new BasicStrategy(options, function(name, password, done) {
  //   return done(null, {name: name});
  // }));

  // instance.serializeUser(function(user, cb) {
  //   user.realm = options.realm;

  //   cb(null, JSON.stringify(user));
  // });

  instance.deserializeUser(function(id, cb) {
    cb(null, JSON.parse(id));
  });

  return instance;
};

var passport = createInstance();
var passportEmployer = createInstance();
require('./config/passport')(passport, config);
require('./config/passportEmployer')(passportEmployer, config);

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function(err, res){
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

var models_dir = __dirname + '/models';
fs.readdirSync(models_dir).forEach(function (file) {
  if(file[0] === '.') return; 
  require(models_dir+'/'+ file);
});

console.log("RESULT***", passportEmployer === passport);

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passportEmployer.initialize());
  app.use(passportEmployer.session());
  app.use(express.methodOverride());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.use(function(err, req, res, next){
  console.log("ERROR:",err);
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

passport.testing();
passportEmployer.testing();

require('./config/routes.js')(app, passport, passportEmployer);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
