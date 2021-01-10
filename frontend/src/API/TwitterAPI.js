const axios = require('axios');

const baseURL = "/twitter"

const getTweets = (callback) => {
  axios.get(`${baseURL}/tweets`)
  .then((res) => {
    return res.data;
  })
  .then((data) => {
    callback(data, null);
  })
  .catch((err) => {
    callback(null, err);
  })
}

const getUsers = (callback) => {
  axios.get(`${baseURL}/users`)
  .then((res) => {
    return res.data;
  })
  .then((data) => {
    callback(data, null);
  })
  .catch((err) => {
    callback(null, err);
  });
}

module.exports = {
  getTweets,
  getUsers,
};