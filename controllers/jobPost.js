var mongoose = require('mongoose');
var Employer = require('../models/employer.js');
var JobPost = require('../models/jobPost.js');

exports.write = function(req, res){
  req.body.coords = [parseFloat(req.body.longitude), parseFloat(req.body.latitude)];
  req.body.yearsExperience = parseInt(req.body.yearsExperience);

  var newJobPost = new JobPost(req.body);
  newJobPost.employerID = req.user._id;
  newJobPost.save(function (err, data) {
    if (err) {
  	  console.log("ERROR in creating job post!!!");
      console.log("ERROR MSG:",err);
      res.writeHead(403);
      res.end('error in creating job post');
    } else {
      console.log('** Job post is created successfully ** ');
      res.redirect('#/employerPortal');
    }
  });
}

exports.read = function(req, res){
  JobPost.find({employerID: req.user._id},
    function (err, result) {
      console.log("Job Post Read Result:", result);
      if (err) {
        console.log("ERROR - reading employer job post aborted!!");
        res.writeHead(500);
       res.end();
      } else {
        console.log("Success in reading employer job post");
        res.send(result);
      }
  });
};

exports.search = function(req, res){
  var coordsArg = [parseFloat(req.query.lng), parseFloat(req.query.lat)];
  var rangeInMeter = parseInt(req.query.range)/3963;
  var yearsExperience;
  var positionType;
  var positionTypeQuery = {};

  var callback = function (err, result) {
      console.log("Job Post Read Result:", result);
      if (err) {
        console.log("ERROR - reading job post aborted!! - ", err);
        res.writeHead(500);
        res.end();
      } else {
        console.log("Success in reading employer job post");
        res.send(result);
      }
  };

  positionType = req.query.positionType;

  if (yearsExperience === undefined){
    yearsExperience = 100;
  } else {
    yearsExperience = parseInt(req.query.yearsExperience);
  }

  if (positionType !== undefined){
    positionTypeQuery = {positionType: positionType};
  }
  
  console.log("**yearsExperience:",yearsExperience);
  JobPost
    .find({ 'coords': { $nearSphere: coordsArg,  $maxDistance : rangeInMeter} })
    .where(positionTypeQuery)
    .where('yearsExperience').lte(yearsExperience)
    .exec(callback);
};



















