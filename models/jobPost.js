var mongoose = require('mongoose');

var jobPostSchema = mongoose.Schema({
  employerID: String,
  positionName: String,
  duties: String,
  longitude: Number,
  latitude: Number,
  cityStateZip: String,
  hourlyRate: String,
  employerType: String,
  yearsExperience: String,
  positionType: String,
  coords: { type: [], index: '2d'},
  experience: {
    education: String,
    Alzheimers: Boolean,
    Handicapped: Boolean,
    Hospice: Boolean,
    Gastronom: Boolean,
    Breathing: Boolean,
    Hoyer: Boolean,
    SpecialMeal: Boolean,
    ChildCare: Boolean,
    Psychiatric: Boolean,
    Geriatric: Boolean,
    Homecare: Boolean,
    AssistedLiving: Boolean
  }
});


jobPostSchema.pre('save', function (next) {
  if (this.isNew && Array.isArray(this.coords) && 0 === this.coords.length) {
    this.coords = undefined;
  }
  next();
});

var JobPost = mongoose.model('JobPost', jobPostSchema);
module.exports = JobPost;