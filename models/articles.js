const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Article Schema

const Article = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  productImage: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Article', Article)