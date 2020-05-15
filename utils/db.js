const mongoose = require("mongoose");

const connect = (url = "mongodb://localhost:27017/newsfeed", opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

module.exports = connect;
