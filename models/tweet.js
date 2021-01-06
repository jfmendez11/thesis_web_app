var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  tweet_id: String,
  name: String,
  screen_name: String,
  retweet_count: Number,
  text: String,
  tokenized_text: [String],
  mined_at: Date,
  created_at: Date,
  favorite_count: Number,
  hashtags: [{
    text: String,
    indices: [Number],
  }],
  status_count: Number,
});

module.exports = mongoose.model('Tweet', tweetSchema);