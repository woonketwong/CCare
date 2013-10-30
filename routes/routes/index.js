
/*
 * GET home page.
 */
var mongoose = require('mongoose');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.workerSignup = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var jobApplicantModel = mongoose.model('JobApplicant');
  console.log("REQ BODY****",req.body);
  var newUser = new jobApplicantModel(req.body);

  newUser.save(function (err, data) {
    if (err) console.log("ERR!!!");
      console.log("*****DATA*****",data);
      mongoose.disconnect();
  });

  res.writeHead(200);
  res.end('IT WORKED');
};