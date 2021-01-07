var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweet');
const User = require('../models/user');
/* GET Tweets */
router.get('/tweets', function(req, res, next) {
  Tweet.find({}, (err, data) => {
    return res.status(200).json(data);
  });
});

/* Get Users */
router.get('/users', function(req, res, next) {
  User.find({}, (err, data) => {
    return res.status(200).json(data);
  });
});

module.exports = router;
