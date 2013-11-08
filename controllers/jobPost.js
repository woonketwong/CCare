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
}

exports.employeeRead = function(req, res){
  console.log("***search params from employee:", req.query);
  var coordsArg = [req.query.lng, req.query.lat];
  var rangeInMeter = Math.floor(req.query.range * 1609.34);
  console.log("coordsArg:", coordsArg);
  console.log("rangeInMeter:", rangeInMeter);
  var queryArg = {coords: { $nearSphere: coordsArg, $maxDistance: rangeInMeter} };
  JobPost.find(queryArg,
    function (err, result) {
      console.log("Job Post Read Result:", result);
      if (err) {
        console.log("ERROR - reading job post aborted!! - ", err);
        res.writeHead(500);
        res.end();
      } else {
        console.log("Success in reading employer job post");
        res.send(result);
      }
  });      
}

// { 'coords' : { 
//    $near : { 
//     $geometry : { 
//       type : 'Point' ,coordinates : coordsArg } }, $maxDistance : rangeInMeter} };

// {'coords': { $nearSphere: coordsArg, $maxDistance: rangeInMeter} }, cb);


// {
//  "$geoNear":{
//   "uniqueDocs":true,
//   "includeLocs":true,
//   "near":[
//      8.759131,
//      40.272393
//   ],
//   "spherical":false,
//   "distanceField":"d",
//   "maxDistance":0.09692224622030236,
//   "query":{
//   },
//   "num":3
//  }
// }

///////
// exports.nearPlaces = function(req, res){
//   JobApplicant.ensureIndex( { "coords" : "2dsphere" } )
//   JobApplicant.find({ 'coords' : { $near : { $geometry : { type : 'Point' ,coordinates : [ 40.071472 , -80.6868 ] } }, $maxDistance : 10000} })
// };

// in jobApplication schema=

//     geo: {type: [Number], index: '2d'}, 

