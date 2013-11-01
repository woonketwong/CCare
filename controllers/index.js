
/* GET home page */
var mongoose = require('mongoose');
var nodemailer = require("nodemailer");
var passwordHash = require('password-hash');
var crypto = require('crypto');
var q = require('q');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.workerSignupVerify = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var emailTokenModel = mongoose.model('EmailToken');

  emailTokenModel.findOne({token: req.params['token']}, 'token email', 
    function (err, result) {
      if (err) {
        // TODO: should add token regeneration logic here
        // TODO: add a field to indicate login successful?
        console.log("ERROR - workerSignupVerify aborted!!");
      }
      if (result === null) { // create user
        mongoose.disconnect();
        res.writeHead(404);
        res.end();
      } else{
        // TODO: create a shell account with name, email, and password
        var jobApplicantModel = mongoose.model('JobApplicant');
        
        console.log('** workerSignupVerify is successful ** ');
        mongoose.disconnect();
        res.redirect('#/worker-login?email='+result.email);
      }
  });

}

exports.workerSignupInitial = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var emailTokenModel = mongoose.model('EmailToken');
  var newEmailToken = new emailTokenModel({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
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
    console.log("TOKEN generated2", token);
    newEmailToken.token = token;
    jobApplicantModel();
  })

  emailTokenModel.findOne({token: newEmailToken.token}, 'name email', 
    function (err, result) {
      if (err) {
        // TODO: should add token regeneration logic here 
        console.log("ERROR - token duplicated aborted!!");
      }
      if (result === null) { // create email token entry
        console.log('result is null, we are creating a new email token record');
        newEmailToken.save(function (err, data) {
          if (err) console.log("ERR!!!");
          console.log("*****email token DATA*****",data);
          var message = req.protocol + "://" + req.get('host') + req.url + "/" + newEmailToken.token;;
          console.log("Message compiled:", message);
          sendEmail(newEmailToken.name, newEmailToken.email, message);
          mongoose.disconnect();
          res.writeHead(200);
          res.end('IT WORKED');
        });
      } else{
        console.log('That user exists: ',result);
        mongoose.disconnect();
        res.writeHead(200);
        res.end('IT WORKED');
      }
  });
};

exports.checkEmailIfExists = function(req,res){
  mongoose.connect('mongodb://localhost/test');
  var jobApplicantModel = mongoose.model('JobApplicant');
  console.log("Email:",req.query.email);
  jobApplicantModel.findOne({email: req.body.email}, 'email', 
    function (err, result) {
      if (err) {
        console.log("ERROR - checkEmailIfExists aborted!!");
      }
      if (result === null) { 
          mongoose.disconnect();
          res.writeHead(200);
          res.end('true');
      } else{
        mongoose.disconnect();
        res.writeHead(202);
        res.end('false');
      }
  });
};

exports.workerSignup = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var jobApplicantModel = mongoose.model('JobApplicant');
  var emailTokenModel = mongoose.model('EmailToken');

  var newUser = new jobApplicantModel(req.body);
  var newEmailToken = new emailTokenModel({
    name: req.body.name,
    email: req.body.email,
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
    console.log("TOKEN generated2", token);
    newEmailToken.token = token;
    jobApplicantModel();
  })

  jobApplicantModel.findOne({name: newUser.name, email: newUser.email}, 'name email', 
    function (err, result) {
      if (err) {
        console.log("ERROR - creating user aborted!!");
      }
      if (result === null) { // create user
        console.log('result is null, we are creating a new user');
        var hashedPassword = passwordHash.generate(newUser.password);
        newUser.password = hashedPassword;
        newUser.save(function (err, data) {
            if (err) console.log("ERR!!!");
            console.log("*****DATA*****",data);
            // mongoose.disconnect();
            //sendEmail();
          mongoose.disconnect();
          res.writeHead(200);
          res.end('IT WORKED');
        });
      } else{
        console.log('That user exists: ',result);
        mongoose.disconnect();
        res.writeHead(200);
        res.end('IT WORKED');
      }
  });
};

exports.workerReadInfo = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var jobApplicantModel = mongoose.model('JobApplicant');

  var newUser = new jobApplicantModel(req.body);


  jobApplicantModel.findOne({name: newUser.name, email: newUser.email}, 'name email', 
    function (err, result) {
      if (err) {
        console.log("ERROR - read worker info aborted!!");
      }
      if (result !== null) {           
        console.log("*****DATA*****",data);
        mongoose.disconnect();
        res.writeHead(200);
        res.end(result);
      }
  });
};

var sendEmail = function(name, email, message){
  
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "credentialedcaredev@gmail.com",
      pass: "credentialed"
    }
  });

  var mailOptions = {
    from: "Crendentialed Care <credentialedcaredev@gmail.com>", // sender address
    to: "woonketwong@hotmail.com", // list of receivers
    subject: "Pending Confirmation", // Subject line
    text: "Thank you for your registration. Please click the following link to v", // plaintext body
    html: "<h1>Hello Applicant!<\/h1><p>Thank you for your registration. Please click the following link to complete your signup process</p><a href='"+ message +"' >Click here</a>" // html body
  }

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }
  });
}