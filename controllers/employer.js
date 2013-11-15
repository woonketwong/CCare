/* GET home page */
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var crypto = require('crypto');
var q = require('q');
var mailer = require('../util/sendEmail.js');
var Employer = require('../models/employer.js');
var EmailToken = require('../models/emailToken.js');
var JobApplicant = require('../models/jobApplicant.js');

exports.loginSuccess = function(req, res){
  console.log('login success route');
  res.writeHead(200);
  res.end('success');
}

exports.loginFail = function(req, res){
  console.log('login fail route');
  res.writeHead(200);
  res.end('fail');
}

exports.employerSignupVerify = function(req, res){
  EmailToken.findOne({token: req.params['token']}, 'name email password phone', 
    function (err, result) {
      if (err) {
        console.log("ERROR - workerSignupVerify aborted!!");
      }
      if (result === null){ //no email token found
        res.writeHead(404);
        res.end();
      } else{
        var newUser = new Employer({
          name: result.name,
          email: result.email,
          password: result.password,
          phone: result.phone
        });
        console.log("RESULT***",result);
        Employer.findOne({email: newUser}, 'email', 
          function (err, result) {
            if (err) {
              console.log("ERROR - creating employerSignupVerify user aborted!!");
            }
            if (result === null) { // create user
              console.log('result is null, we are creating a new user');
              newUser.save(function (err, data) {
                if (err) console.log("ERR!!!");
                  console.log('** employerSignupVerify is successful ** ');
                  console.log("Result Obj***", data);
                  res.redirect('#/employer-login?email='+newUser.email);
              });
            } else{
              console.log('That user exists: ', result);
              res.writeHead(500);
              res.end("500 Internal Server Error - user existed, could not create account");
            }
        });
      }
  });
}

exports.employerSignupInitial = function(req, res){
  var newEmailToken = new EmailToken({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    phone: req.body.phone,
    token: ''
  });
  var token;
  console.log(req.body);
  function createToken(){
    var deferred = q.defer();
    crypto.randomBytes(20, function(ex, buf) {
      console.log("buf**", buf);
      console.log("buf.toString**", buf.toString('hex'));
      token = buf.toString('hex');
      // console.log("TOKEN generated1", token);
      deferred.resolve('deferred resolved!!');
    });
    return deferred.promise;
  }

  createToken().then(function(){
    newEmailToken.token = token;
    newEmailToken.save(function (err) {
      if (err) console.log("ERROR in saving new email token!!!");
      var confirmationLink = req.protocol + "://" + req.get('host') + req.url + "/" + newEmailToken.token;;
      var locals = {
        email: newEmailToken.email,
        subject: 'Verify your Credentialed Care account',
        name: newEmailToken.name,
        confirmationLink: confirmationLink
      };
      mailer.sendOne('registrationVerif', locals, function(err, responseStatus, html, text){
        if (err){
          console.log("ERROR in sending registration verification email to job applicant!!!");
          console.log("ERR message:",err);
          res.writeHead(500);
        } else {
          res.writeHead(200);
        }
          res.end();
      });
    });
  })
};

exports.checkEmailIfExists = function(req,res){ 
  console.log("Email:",req.query.email);
  Employer.findOne({email: req.body.email}, 'email', 
    function (err, result) {
      if (err) {
        console.log("ERROR - checkEmailIfExists aborted!!");
      }
      if (result === null) { 
          res.writeHead(200);
          res.end('true');
      } else{
        res.writeHead(202);
        res.end('false');
      }
  });
};

exports.updateInfo = function(req, res){
  // to do - data validation
  Employer.update({ email: req.user.email }, {$set: req.body}, function (err, data) {
    if (err){
      console.log("ERROR in updating Info");
      res.writeHead(400);
    } else {
      console.log("SUCCESS in updating info")
      res.writeHead(201);
    }
    res.end();
  });
}


// exports.employerReadInfo = function(req, res){
//   var employer = new Employer(req.body);
//   Employer.findOne({name: employer.name, email: employer.email}, 'name email', 
//     function (err, result) {
//       if (err) {
//         console.log("ERROR - read worker info aborted!!");
//       }
//       if (result !== null) {
//         console.log("*****DATA*****",data);
//         res.writeHead(200);
//         res.end(result);
//       }
//   });
// };

exports.sessionData = function(req,res){
  res.json(req.user);
};

// exports.listEmployers = function(req,res){
//   console.log('hi')
//   Employer.find({},'name _id', function(err,result){
//     if(err) console.log(err);
//     console.log(result);
//     res.json(result);
//   })
// }


exports.search = function(req, res){

  var coordsArg = [parseFloat(req.query.lng), parseFloat(req.query.lat)];
  var rangeInMeter = req.query.range/3963;

  var callback = function (err, result) {
    if (err) {
      console.log("ERROR - reading employee list aborted!! - ", err);
      console.log("ERROR MSG:", err)
      res.writeHead(500);
      res.end();
    } else {
      console.log("Success in reading employee list post");
      console.log("Result:", result);
      res.send(result);
    }
  };

  // JobPost.geoNear({ type : 'Point' ,coordinates : coordsArg }, {maxDistance: rangeInMeter, spherical: true});
  JobApplicant
    .find({ 'coords': { $nearSphere: coordsArg,  $maxDistance : rangeInMeter} })
    // .where({positionName: "Sunnyvale Starbucks"})
    .exec(callback);
};









