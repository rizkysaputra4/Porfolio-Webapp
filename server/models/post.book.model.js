const { string, date } = require("@hapi/joi");
const mongoose = require("mongoose");

const createPost = mongoose.Schema;

const postSchema = new createPost({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  post: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  lastEdited: {
    type: Date,
    required: true,
  },
  reply: [
    /* {
      name: {
        type: String,
        required: true,
      },
      replyText: {
        type: String,
        required: true,
      },
      postedDate: {
        type: Date,
        required: true,
      },
      lastEdited: {
        type: Date,
        required: true,
      },
    }, */
  ],
});

const post = mongoose.model("post", postSchema);

module.exports = post;
