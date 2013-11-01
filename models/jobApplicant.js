var mongoose = require('mongoose');
// var hash = require('../util/hash');
var passwordHash = require('password-hash');

var jobApplicantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    accountCreated: Boolean,
    preferences: {
      hourlyRate: Number, 
      dailyRate: Number,
      jobType: {
        caregiver: Boolean,
        CHHA: Boolean,
        STNA: Boolean,
        PCA: Boolean,
        LPN: Boolean,
        CNA: Boolean
      },
      //ADD SCHEDULE INFO
      homeCareInterest: Boolean,
      facilityCareInterest: Boolean,
      workRadius: Number,
      carAvailable: Boolean,
      yearsExperience: Number,
      previousEmployerName: String,
      certifications:{
        PCA: Boolean,
        CHHA: Boolean,
        CNA: Boolean,
        LPN: Boolean
      },
      languages:{
        Arabic: Boolean,
        Chinese_Cantonese: Boolean,
        Chinese_Mandarin: Boolean,
        Farsi: Boolean,
        Filipino: Boolean,
        French: Boolean,
        Greek: Boolean,
        Hebrew: Boolean,
        Hindu: Boolean,
        Italian: Boolean,
        Japanese: Boolean,
        Korean: Boolean,
        Polish: Boolean,
        Russian: Boolean,
        Spanish: Boolean,
        Swahili: Boolean,
        Vietnamese: Boolean
      },
      specializations:{

      },
      idealPatient: String,
      idealWorkEnvironment: String
    }
});


jobApplicantSchema.statics.signup = function(name, email, password, done){
  var jobApplicant = this;
  jobApplicant.create({
  name: name,
  email : email,
  password : password
  }, function(err, user){
    if(err) throw err;
    // if (err) return done(err);
    done(null, user);
  });
}

jobApplicantSchema.statics.isValidUserPassword = function(email, rawPassword, done) {
  this.findOne({email : email}, 'password', function(err, user){
    // if(err) throw err;
    if(err) return done(err);
    if(!user) return done(null, false, { message : 'Incorrect email.' });
    
    var matched = passwordHash.verify(rawPassword, password);
    if (!matched){
      return done(null, false, {
        message : 'Incorrect password'
      });
    } else {
      return done(null, user);
    }
  });
};

var JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);
module.exports = JobApplicant;