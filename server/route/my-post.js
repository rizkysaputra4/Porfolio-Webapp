/* const app = require("express").Router();
const { getNodeText } = require("@testing-library/react");
let Post = require("../models/post.book.model");
const auth = require("./verify-token");

app.get("/mypost", auth.verify, (req, res) => {
  Post.find()
    .sort({ lastEdited: -1 })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = app;
 */
