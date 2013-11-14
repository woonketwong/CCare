/* GET home page */
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var crypto = require('crypto');
var q = require('q');
var JobApplicant = require('../models/jobApplicant.js');
var EmailToken = require('../models/emailToken.js');
var mailer = require('../util/sendEmail.js');
var JobPost = require('../models/jobPost.js');

exports.updateInfo = function(req, res){
  // to do - data validation
  req.body.coords = [req.body.preferences.longitude, req.body.preferences.latitude];
  JobApplicant.update({ email: req.user.email }, {$set: req.body}, function (err, data) {
    if (err){
      console.log("ERROR in updating Info - ", err);
      res.writeHead(400);
    } else {
      console.log("SUCCESS in updating info")
      res.writeHead(201);
    }
    res.end();
  });
}

exports.allJobsList = function(req,res){
  JobPost.find(
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
