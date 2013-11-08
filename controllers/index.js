
/* GET home page */
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var crypto = require('crypto');
var q = require('q');
var JobApplicant = require('../models/jobApplicant.js');
var EmailToken = require('../models/emailToken.js');
var sendEmail = require('../util/sendEmail.js');
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
        // TODO: should add token regeneration logic here
        // TODO: add a field to indicate login successful?
        console.log("ERROR - workerSignupVerify aborted!!");
      }
      if (result === null){ //no email token found
        res.writeHead(404);
        res.end();
      } else{
        // TODO: create a shell account with name, email, and password
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
      if (err) console.log("ERR!!!");
      var message = req.protocol + "://" + req.get('host') + req.url + "/" + newEmailToken.token;;
      sendEmail(newEmailToken.name, newEmailToken.email, message);
      res.writeHead(200);
      res.end();
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

exports.workerSignup = function(req, res){

};

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

exports.sessionData = function(req,res){
  console.log("user",req.user);
  console.log("session",req.session);
  res.json(req.user);
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



  // exports.dothings = function(req,res){
  //   console.log(req.user.email)
  //   console.log(req.user);
  //   console.log(req.body);
  //   res.writeHead(200);
  //   res.end();
  // }

// exports.getProfile = function(req,res){
//   res.json(req.session.askedBefore);
//   req.session.askedBefore = true;
// };

