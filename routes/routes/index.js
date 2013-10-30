
/*
 * GET home page.
 */
var mongoose = require('mongoose');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.signup = function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var jobApplicantModel = mongoose.model('JobApplicant');
  var newUser = new jobApplicantModel({username:req.body[0],password:req.body[1]});
  
  newUser.save(function (err, data) {
    if (err) console.log("ERR!!!");
      console.log("*****DATA*****",data);
      mongoose.disconnect(); 
  });
  
  res.writeHead(200);
  res.end('IT WORKED');
};