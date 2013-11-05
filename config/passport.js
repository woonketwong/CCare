var mongoose = require('mongoose')
var JobApplicant = mongoose.model('JobApplicant');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {

  console.log(passport);
  passport.serializeUser(function(user, done) {
	  done(null, user.id);
  });

  passport.testing = function(){
    console.log("*************In passport");
  };

  passport.deserializeUser(function(id, done) {
	  JobApplicant.findOne({ _id: id }, function (err, user) {
  	  done(err, user);
	 });
  });

  passport.use(new LocalStrategy({
	  usernameField: 'email',
	  passwordField: 'password'
  },
  function(email, password, done) {
    JobApplicant.isValidUserPassword(email, password, done);
  }));
}