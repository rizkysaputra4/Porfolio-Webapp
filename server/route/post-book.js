const express = require("express");
const e = require("express");
const post = require("../models/post.book.model");
let Post = require("../models/post.book.model");
const auth = require("./verify-token");
const today = require("../models/date");
const app = express.Router({ mergeParams: true });

///////////GET ALL POST///////////////
app.post("/get", (req, res) => {
  const options = {
    page: req.body.page,
    limit: 10,
    sort: { date: -1 },
    collation: {
      locale: "en",
    },
  };

  post.paginate({}, options, (err, result) => {
    res.json(result);
  });
});

//////////GET POST BY ID///////////////
app.get("/get/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json(err));
});

///////////CREATE POST////////////////////
app.post("/addPost", auth.verify, (req, res) => {
  const userName = req.cookies.userName;
  const post = req.body.post;
  const company = req.body.company;
  const position = req.body.position;
  const dateCreated = today;
  const lastEdited = dateCreated;
  const vote = 0;

  const newPost = new Post({
    userName,
    post,
    company,
    position,
    dateCreated,
    lastEdited,
    vote,
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
  const postedDate = today;
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
      .then((thePost) => res.json(thePost.reply))
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
      post.post = req.body.post;

      post.lastEdited = Date.now(req.body.lastEdited);

      post
        .save()
        .then((postEdited) => res.json("Post has been edited"))
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
app.delete("/deletepost/:id", auth.modifyPostAuth, (req, res) => {
  const clientUsername = req.cookies.userName;

  Post.findOne({ _id: req.params.id }, (err, result) => {
    if (!result) {
      res.json({ error: "cannot find post ID" });
    } else {
      if (clientUsername !== result.userName) {
        res.json({ error: "You cannot delete someone else post" });
      } else {
        result.remove();
        res.json({ re: `this post has been deleted` });
      }
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

/////////////////VOTE//////////////////////
app.post("/upvotepost/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id)
    .then((post) => {
      const voteTotal = post.vote + 1;
      post.vote = voteTotal;
      post
        .save()
        .then((post) => res.json(post.vote))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.post("/downvotepost/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id)
    .then((post) => {
      const voteTotal = post.vote - 1;
      post.vote = voteTotal;
      post
        .save()
        .then((post) => res.json(post.vote))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = app;
