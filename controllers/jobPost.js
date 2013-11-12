var mongoose = require('mongoose');
var Employer = require('../models/employer.js');
var JobPost = require('../models/jobPost.js');

exports.write = function(req, res){
  
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


