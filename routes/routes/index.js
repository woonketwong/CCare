
/*
 * GET home page.
 */
var mongoose = require('mongoose');



exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.signup = function(req, res){
  mongoose.createConnection('mongodb://localhost/test');
  var credentials = mongoose.model('Credentials', { username: String , password: String});
  var user = new credentials({username:req.body[0],password:req.body[1]});
  user.save(function(err,obj){
    if(err) console.log(err);
    credentials.find(function(err,stuff){
      if(err) console.log(err);
      console.log(stuff);
      mongoose.disconnect();
      res.writeHead(200);
      res.end('IT WORKED');
    });
  });
  console.log(req.body);

};