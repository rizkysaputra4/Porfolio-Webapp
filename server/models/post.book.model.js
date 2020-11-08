const { string, date } = require("@hapi/joi");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    type: String,
    required: true,
  },
  lastEdited: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  vote: {
    type: Number,
  },
  reply: [
    {
      userName: {
        type: String,
      },
      replyText: {
        type: String,
      },
      postedDate: {
        type: String,
      },
      lastEdited: {
        type: String,
      },
    },
  ],
});

postSchema.plugin(mongoosePaginate);

const post = mongoose.model("post", postSchema);

module.exports = post;
