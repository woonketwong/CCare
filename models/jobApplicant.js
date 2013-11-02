var mongoose = require('mongoose');
// var hash = require('../util/hash');
var passwordHash = require('password-hash');

var jobApplicantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
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
      fullTime: Boolean,
      partTime: Boolean,
      dayShift: Boolean,
      nightShift: Boolean,
      weekDays: Boolean,
      weekEnds: Boolean,
      homeCare: Boolean,
      facilityCare: Boolean,
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
      idealWorkEnvironment: String,
      interests: String
    }
});


jobApplicantSchema.statics.signup = function(name, email, password, done){
  console.log("In jobApplicantSchema ")
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
  console.log("is valid user password")
  this.findOne({email : email}, 'email password', function(err, data){
    console.log(data)
    // if(err) throw err;
    if(err){
      console.log('login error');
      return done(err);
    }
    if(!data){
      console.log('user not found');
      return done(null, false, { message : 'Incorrect email.' });
    }
    var matched = passwordHash.verify(rawPassword, data.password);
    if (!matched){
      console.log('passwords didnt match');
      return done(null, false, {
        message : 'Incorrect password'
      });
    } else {
      console.log('login successful');
      return done(null, data);
    }
  });
};

var JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);
module.exports = JobApplicant;