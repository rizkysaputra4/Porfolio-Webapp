const mongoose = require("mongoose");
const createUser = mongoose.Schema;

const userSchema = new createUser({
  userName: {
    type: String,
    min: 4,
    max: 255,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 4,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  postId: [
    {
      type: String,
    },
  ],
});

const user = mongoose.model("user", userSchema);
module.exports = user;
