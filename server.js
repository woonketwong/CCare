/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config.js');
var router = require('./router.js');
var mongoose = require('mongoose');
var util = require('util');
  passport = require("passport"),
var port = process.env.PORT || 5000;
var app = express();

////////////////////////////////////////
//Database initialization
////////////////////////////////////////
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';
// 'mongodb://localhost/test';

mongoose.connect(uristring, function(err, res){
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

var models_dir = __dirname + '/app/models';
fs.readdirSync(models_dir).forEach(function (file) {
  if(file[0] === '.') return; 
  require(models_dir+'/'+ file);
});

var emailTokenSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String
})

mongoose.model('EmailToken', emailTokenSchema);

require('./config/passport')(passport, config)

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.use(function(err, req, res, next){
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

require('./config/routes')(app, passport);

mongoose.disconnect();
  //var JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);
  //var newJobApplicant = new JobApplicant({name: 'Adam'});

  //newJobApplicant.save(function (err, data) {
    //if (err) console.log("ERR!!!");
    //console.log("DATA!!",data);
  //});
// });
///////////////////////////////////////////

require('./config/routes')(app, passport);
// config(app);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
