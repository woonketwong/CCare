var mongoose = require('mongoose');
var Employer = require('../models/employer.js');
var JobPost = require('../models/jobPost.js');
var JobApplicant = require('../models/jobApplicant.js');
var EmailToken = require('../models/emailToken.js');


exports.allInfo = function(req,res){
  records = {};
  JobApplicant.find(function(err,docs){
    records.applicants = docs;
    JobPost.find(function(err,docs){
      records.posts = docs;
      Employer.find(function(err,docs){
        records.employers = docs;
        res.writeHead(200);
        res.end(JSON.stringify(records));
      })
    })
  })
};

exports.deleteEntry = function(req,res){
  console.log('Delete request recieved')
  if(req.body.table === 'employer'){
    console.log('deleting employer')
    Employer.remove({_id:req.body.id},function(err){
      if (err) {
        console.log("ERROR in removing employer!!!");
        console.log("ERROR MSG:",err);
      } else {
        console.log("Req.body.id:", req.body.id);
        JobPost.remove({employerID:req.body.id},function(err){
          if (err){
            console.log("ERROR in removing job post!!!");
            console.log("ERROR MSG:",err);
          }
        });
      }
    });
    res.writeHead(200);
    res.end();
  } else if(req.body.table==='applicant'){
    console.log('deleting applicant')
    JobApplicant.remove({_id:req.body.id},function(err){console.log(err)})
    res.writeHead(200);
    res.end();
  } else if(req.body.table === 'post'){
    console.log('deleting post')
    JobPost.remove({_id:req.body.id},function(err){console.log(err)})
    res.writeHead(200);
    res.end();
  }
};