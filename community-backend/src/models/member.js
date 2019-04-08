const mongoose = require('mongoose');

const { Schema } = mongoose;

const Member = new Schema({
  id: String,
  pwd: String,
  name: String
});

module.exports = mongoose.model('Member', Member);