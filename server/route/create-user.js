const app = require("express").Router();
const User = require("../models/create.user.model");
const { registerValidation, loginValidation } = require("../models/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/userPost/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id).then((user) => {
    user.postId.push(req.body.postId);
    user
      .save()
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });
});

module.exports = app;
