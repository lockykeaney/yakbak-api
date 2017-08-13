const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const postSchema = mongoose.Schema({

  postedOn: { type: Date, default: Date.now },
  content: { type: String, maxlength: 140 },
  votes: { type: Number, default: 0 },
  comments: [
    {
      commentedOn: { type: Date, default: Date.now },
      comment: { type: String, maxlength: 140 }
    }
  ]

});

module.exports = mongoose.model('Post', postSchema);
