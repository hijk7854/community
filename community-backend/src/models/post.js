const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  name: String,
  title: String,
  content: String,
  tags: [String], // 문자열 배열
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본 값으로 지정
  },
  views: Number,
  comments: [{
    subname: String,
    body: String,
  }]
});

module.exports = mongoose.model('Post', Post);