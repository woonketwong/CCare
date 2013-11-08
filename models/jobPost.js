var mongoose = require('mongoose');

var jobPostSchema = mongoose.Schema({
  employerID: String,
  positionName: String,
  duties: String,
  longitude: Number,
  latitude: Number,
  hourlyRate: String,
  yearsExperience: String,
  positionType: String,
  coords: { type: [], index: '2dsphere'},
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
})

var JobPost = mongoose.model('JobPost', jobPostSchema);
module.exports = JobPost;