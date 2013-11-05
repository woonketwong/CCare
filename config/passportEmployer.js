var mongoose = require('mongoose')
var Employer = mongoose.model('Employer');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function(user, done) {
	  done(null, user.id);
  });

  passport.testing = function(){
    console.log("*************In passportEmployer");
  };

  passport.deserializeUser(function(id, done) {
	  Employer.findOne({ _id: id }, function (err, user) {
  	  done(err, user);
	 });
  });

  passport.use(new LocalStrategy({
	  usernameField: 'email',
	  passwordField: 'password'
  },
  function(email, password, done) {
    Employer.isValidUserPassword(email, password, done);
  }));
}