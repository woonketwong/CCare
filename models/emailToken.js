var mongoose = require('mongoose');

var emailTokenSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  token: String
})

var EmailToken = mongoose.model('EmailToken', emailTokenSchema);
module.exports = EmailToken;