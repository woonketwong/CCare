var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var employerSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        phone: String,
        comments: String
});


employerSchema.statics.signup = function(name, email, password, phone, comments, done){
  console.log("In employerApplicantSchema ");
  var employer = this;
  employer.create({
  name: name,
  email : email,
  password : password,
  phone: phone,
  comments: comments
  }, function(err, user){
    if(err) throw err;
    // if (err) return done(err);
    done(null, user);
  });
}

employerSchema.statics.isValidUserPassword = function(email, rawPassword, done) {
  console.log("is valid employer password")
  this.findOne({email : email}, 'email password', function(err, data){
    console.log(data)
    // if(err) throw err;
    if(err){
      console.log('login error');
      return done(err);
    }
    if(!data){
      console.log('employer not found');
      return done(null, false, { message : 'Incorrect email.' });
    }
    var matched = passwordHash.verify(rawPassword, data.password);
    if (!matched){
      console.log('passwords didnt match');
      return done(null, false, {
        message : 'Incorrect password'
      });
    } else {
      console.log('employer login successful');
      return done(null, data);
    }
  });
};

var Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;