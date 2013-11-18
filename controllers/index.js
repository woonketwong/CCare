/* GET home page */
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var crypto = require('crypto');
var q = require('q');
var JobApplicant = require('../models/jobApplicant.js');
var EmailToken = require('../models/emailToken.js');
var mailer = require('../util/sendEmail.js');
var JobPost = require('../models/jobPost.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

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

exports.workerSignupVerify = function(req, res){
  EmailToken.findOne({token: req.params['token']}, 'name email password phone', 
    function (err, result) {
      if (err) {
        console.log("ERROR - workerSignupVerify aborted!!");
      }
      if (result === null){ //no email token found
        res.writeHead(404);
        res.end();
      } else{
        var newUser = new JobApplicant({
          name: result.name,
          email: result.email,
          password: result.password,
          phone: result.phone
        });
        console.log("RESULT***",result);
        JobApplicant.findOne({email: newUser}, 'email', 
          function (err, result) {
            if (err) {
              console.log("ERROR - creating (workerSignupVerify) user aborted!!");
            }
            if (result === null) { // create user
              console.log('result is null, we are creating a new user');
              newUser.save(function (err, data) {
                if (err) console.log("ERR!!! - ",err);
                  console.log('** workerSignupVerify is successful ** ');
                  console.log("Result Obj***", data);
                  res.redirect('#/worker-login?email='+newUser.email);
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

exports.workerSignupInitial = function(req, res){
  var newEmailToken = new EmailToken({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    phone: req.body.phone,
    token: ''
  });
  var token;

  function createToken(){
    var deferred = q.defer();
    crypto.randomBytes(20, function(ex, buf) {
      token = buf.toString('hex');
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
  JobApplicant.findOne({email: req.body.email}, 'email', 
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

exports.workerReadInfo = function(req, res){
  var jobApplicantModel = mongoose.model('JobApplicant');
  var newUser = new jobApplicantModel(req.body);
  
  jobApplicantModel.findOne({name: newUser.name, email: newUser.email}, 'name email', 
    function (err, result) {
      if (err) {
        console.log("ERROR - read worker info aborted!!");
      }
      if (result !== null) {
        console.log("*****DATA*****",data);
        res.writeHead(200);
        res.end(result);
      }
  });
};



