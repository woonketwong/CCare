var mongoose = require('mongoose');
var Employer = require('../models/employer.js');
var JobPost = require('../models/jobPost.js');

exports.write = function(req, res){
  req.body.coords = [req.body.longitude, req.body.latitude];
  var newJobPost = new JobPost(req.body);
  newJobPost.employerID = req.user._id;
  newJobPost.save(function (err, data) {
    if (err) {
  	  console.log("ERROR in creating job post!!!");
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
  var rangeInMeter = req.query.range/3963;
  var yearsExperience = req.query.yearsExperience;
  var positionType = req.query.positionType;
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

  // clean data
  // positionType and yearsExperience are optional fields
  if (req.query.yearsExperience === "undefined"){
    yearsExperience = 100;
  }
  if (positionType !== "undefined"){
    positionTypeQuery = {positionType: positionType};
  }

  JobPost
    .find({ 'coords': { $nearSphere: coordsArg,  $maxDistance : rangeInMeter} })
    .where(positionTypeQuery)
    .where('yearsExperience').lte(yearsExperience)
    .exec(callback);
};

  // JobPost.geoNear({ type : 'Point' ,coordinates : coordsArg }, {maxDistance: rangeInMeter, spherical: true});
// find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, cb);
// { 'coords': { $near : { $geometry : { type : 'Point' ,coordinates : coordsArg } }, $maxDistance : rangeInMeter} }





















