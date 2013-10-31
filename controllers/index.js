
/* GET home page */
var mongoose = require('mongoose');
var nodemailer = require("nodemailer");
var passwordHash = require('password-hash');
var crypto = require('crypto');
var q = require('q');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.workerSignup = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var jobApplicantModel = mongoose.model('JobApplicant');

  var newUser = new jobApplicantModel(req.body);

  var token;
  
  function createToken(){
    var deferred = q.defer();

    crypto.randomBytes(20, function(ex, buf) {
      console.log("buf**", buf);
      console.log("buf.toString**", buf.toString('hex'));
      token = buf.toString('hex');
      console.log("TOKEN generated1", token);
      deferred.resolve('deferred resolved!!');
    });

    return deferred.promise;
  }

  createToken().then(function(){
    console.log("TOKEN generated2", token);
  })

  jobApplicantModel.findOne({name: newUser.name, email: newUser.email}, 'name email', 
    function (err, result) {
      if (err) {
        console.log("ERROR - creating user aborted!!");
      }
      if (result === null) { // create user
        var hashedPassword = passwordHash.generate(newUser.password);
        newUser.password = hashedPassword;
        newUser.save(function (err, data) {
          if (err) console.log("ERR!!!");
          
          console.log("*****DATA*****",data);
          mongoose.disconnect();
          //sendEmail();
          res.writeHead(200);
          res.end('IT WORKED');
        });
      }
  });

  res.writeHead(200);
  res.end('IT WORKED');
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

var sendEmail = function(){
  
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "credentialedcaredev@gmail.com",
      pass: "credentialed"
    }
  });

  var mailOptions = {
    from: "Crendentialed Care <credentialedcaredev@gmail.com>", // sender address
    to: "woonketwong@gmail.com", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world", // plaintext body
    html: "<b>Hello world</b>" // html body
  }

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }
  });
}