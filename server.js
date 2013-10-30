
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config.js');
var router = require('./routes/router.js');
var mongoose = require('mongoose');
var util = require('util');
var port = process.env.PORT || 5000;
var app = express();

////////////////////////////////////////
//Database initialization
////////////////////////////////////////
mongoose.connect('mongodb://localhost/test');
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
  var jobApplicantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
  });

  // );

  mongoose.model('JobApplicant', jobApplicantSchema);

  // app.param('collectionName',
  //  function(req, res, next, collectionName) {
  //    req.collection = db.collection(collectionName);
  //    return next();
  // });

  mongoose.disconnect();
  //var JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);
  //var newJobApplicant = new JobApplicant({name: 'Adam'});

  //newJobApplicant.save(function (err, data) {
    //if (err) console.log("ERR!!!");
    //console.log("DATA!!",data);
  //});
// });
///////////////////////////////////////////

app.use(express.logger());
app.param('collectionName', function(req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

config(app);
router(app);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
