var mongoose = require('mongoose');
var Employer = require('../models/employer.js');
var JobPost = require('../models/jobPost.js');

exports.write = function(req, res){
  
  console.log('REQ Body:', req.body);
  console.log("req.user LOG:", req.user);
  console.log("req.session LOG:", req.session);

  var newJobPost = new JobPost(req.body);
  newJobPost.employerId = req.user._id;
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


