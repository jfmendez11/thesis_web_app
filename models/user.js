var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user_id: String,
  last_tweet_mined: String,
  name: String,
  screen_name: String,
  profile_image_url: String,
  verified: Boolean,
});

module.exports = mongoose.model('User', userSchema);