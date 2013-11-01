var mongoose = require('mongoose')
var JobApplicant = mongoose.model('JobApplicant');

module.exports = function (passport, config) {

  passport.serializeUser(function(user, done) {
	  done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
	  User.findOne({ _id: id }, function (err, user) {
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