var mongoose = require('mongoose');
var Employer = require('../models/employer.js');
var JobPost = require('../models/jobPost.js');

exports.write = function(req, res){
  
  console.log('REQ Body:', req.body);

  var newJobPost = new JobPost(req.body);
  console.log("req.user LOG:", req.user)
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


// [11/6/13 10:40:29 AM] Stephen Grider: user { name: 'asdf',
//   email: 'ste.grider@gmail.com',
//   password: 'sha1$6c621852$1$26657c5094bb1c26f45e9be2860df8dc5f5430c2',
//   phone: 'asdf',
//   _id: 5279379fa090532379000002,
//   __v: 0,
//   preferences: 
//    { specializations: {},
//      languages: {},
//      certifications: {},
//      jobType: {} } }
// [11/6/13 10:40:54 AM] Stephen Grider: and a   console.log("session",req.session);
// [11/6/13 10:41:02 AM] Stephen Grider: will give you this:
// [11/6/13 10:41:03 AM] Stephen Grider: session { cookie: 
//    { path: '/',
//      _expires: null,
//      originalMaxAge: null,
//      httpOnly: true },
//   passport: { user: '5279379fa090532379000002' } }




