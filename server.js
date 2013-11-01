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
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
  var emailTokenSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String
  })
  var jobApplicantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    accountCreated: Boolean,
    preferences: {
      hourlyRate: Number, 
      dailyRate: Number,
      jobType: {
        caregiver: Boolean,
        CHHA: Boolean,
        STNA: Boolean,
        PCA: Boolean,
        LPN: Boolean,
        CNA: Boolean
      },
      //ADD SCHEDULE INFO
      homeCareInterest: Boolean,
      facilityCareInterest: Boolean,
      workRadius: Number,
      carAvailable: Boolean,
      yearsExperience: Number,
      previousEmployerName: String,
      certifications:{
        PCA: Boolean,
        CHHA: Boolean,
        CNA: Boolean,
        LPN: Boolean
      },
      languages:{
        Arabic: Boolean,
        Chinese_Cantonese: Boolean,
        Chinese_Mandarin: Boolean,
        Farsi: Boolean,
        Filipino: Boolean,
        French: Boolean,
        Greek: Boolean,
        Hebrew: Boolean,
        Hindu: Boolean,
        Italian: Boolean,
        Japanese: Boolean,
        Korean: Boolean,
        Polish: Boolean,
        Russian: Boolean,
        Spanish: Boolean,
        Swahili: Boolean,
        Vietnamese: Boolean
      },
      specializations:{

      },
      idealPatient: String,
      idealWorkEnvironment: String
    }
  });

  // );

  mongoose.model('JobApplicant', jobApplicantSchema); 
  mongoose.model('EmailToken', emailTokenSchema);


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
