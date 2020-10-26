//const app = require("express").Router();
const express = require("express");
const { getNodeText } = require("@testing-library/react");
const e = require("express");
const post = require("../models/post.book.model");
const { db, remove } = require("../models/post.book.model");
let Post = require("../models/post.book.model");
const auth = require("./verify-token");
/* import verify from "./verify-token.js"; */
const app = express.Router({ mergeParams: true });

///////////GET ALL POST///////////////
app.get("/get", auth.verify, (req, res) => {
  Post.find()
    .sort({ lastEdited: -1 })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json(err));
});

//////////GET POST BY ID///////////////
app.get("/get/:id", (req, res) => {
  console.log(req.cookies.userID);
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json(err));
});

///////////ADD POST////////////////////
app.post("/addPost", auth.verify, (req, res) => {
  const userName = req.cookies.userName;
  const post = req.body.post;
  const company = req.body.company;
  const position = req.body.position;
  const dateCreated = Date.now(req.body.dateCreated);
  const lastEdited = dateCreated;

  const newPost = new Post({
    userName,
    post,
    company,
    position,
    dateCreated,
    lastEdited,
  });

  newPost
    .save()
    .then((newPost) => res.json(newPost))
    .catch((err) => res.json("error: " + err));
});

////////////POST REPLY///////////////////
app.post("/replyPost/:id", (req, res) => {
  const userName = req.cookies.userName;
  const replyText = req.body.replyText;
  const postedDate = Date.now(req.body.postedDate);
  const lastEdited = postedDate;

  const reply = {
    userName,
    replyText,
    postedDate,
    lastEdited,
  };

  Post.findByIdAndUpdate(req.params.id).then((post) => {
    post.reply.push(reply);
    post
      .save()
      .then((thePost) => res.json(thePost))
      .catch((err) => console.log(err));
  });
});

/////////////UPDATE POST BY ID/////////////////
app.post("/updatePost/:id", auth.modifyPostAuth, (req, res) => {
  const clientUsername = req.cookies.userName;
  Post.findByIdAndUpdate(req.params.id).then((post) => {
    if (clientUsername !== post.userName) {
      res.json({ error: "You cannot modify someone else post" });
    } else {
      post.name = req.body.name;
      post.post = req.body.post;
      post.company = req.body.company;
      post.position = req.body.position;
      post.lastEdited = Date.now(req.body.lastEdited);

      post
        .save()
        .then((postEdited) => res.json(postEdited))
        .catch((err) => res.json(403).json(err));
    }
  });
});

//////////////GET REPLY////////////////////////
app.get("/getreply/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json({ reply: post.reply });
    })
    .catch((err) => res.status(400).json(err));
});

/////////////////DELETE POST//////////////////////
app.delete("/deletepost/:id", auth.modifyPostAuth, (req, res, next) => {
  const clientUsername = req.cookies.userName;

  Post.findOne({ _id: req.params.id }, (err, result) => {
    if (clientUsername !== result.userName) {
      res.json({ error: "You cannot delete someone else post" });
    } else {
      result.remove().catch((err) => res.json({ err }));
      res.json({ re: `this post ${req.params.id} has been deleted` });
    }
  });
});

/////////////GET POST BY OP ID///////////////////////
app.get(
  "/getting/mypost",
  (req, res, next) => {
    console.log("getting mypost");
    next();
  },
  (req, res) => {
    Post.find({ userName: req.cookies.userName })
      .then((post) => res.json(post))
      .catch((err) => console.log(err));
  }
);

module.exports = app;
