var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var jobApplicantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    account: String,
    phone: String,
    accountCreated: Boolean,
    coords: { type: [], index: '2dsphere'},
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
      longitude: Number,
      latitude: Number,
      partTime: Boolean,
      dayShift: Boolean,
      nightShift: Boolean,
      weekDays: Boolean,
      weekEnds: Boolean,
      homeCare: Boolean,
      facilityCare: Boolean,
      workRadius: Number,
      catsOk: Boolean,
      dogsOk: Boolean,
      smokeOk: Boolean,
      lift25ok: Boolean,
      carAvailable: Boolean,
      education: String,
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
        Alzheimers: Boolean,
        Handicapped: Boolean,
        Hospice: Boolean,
        Gastronomy: Boolean,
        Breathing: Boolean,
        Hoyer: Boolean,
        SpecialMeal: Boolean,
        ChildCare: Boolean,
        Psychiatric: Boolean,
        Geriatric: Boolean,
        Homecare: Boolean,
        AssistedLiving: Boolean,
        Fingerprints: Boolean,
        AHCALevel2: Boolean,
        CPR: Boolean,
        FirstAid: Boolean,
        BLS: Boolean,
        TBTest: Boolean
      },
      idealPatient: String,
      idealWorkEnvironment: String,
      interests: String,
      patientMatchScore: Number,
      scheduleMatchScore: Number,
      workCloseToHomeScore: Number,
      workEnvironmentScore: Number,
      employer: Boolean
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
      console.log('job applicant login successful');
      return done(null, data);
    }
  });
};

jobApplicantSchema.pre('save', function (next) {
  if (this.isNew && Array.isArray(this.coords) && 0 === this.coords.length) {
    this.coords = undefined;
  }
  next();
})

var JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);
module.exports = JobApplicant;








