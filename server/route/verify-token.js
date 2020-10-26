const jwt = require("jsonwebtoken");
const unknown = require("../default-val");
const user = require("../models/create.user.model");

function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.json({ login: false });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400);
  }
}

function modifyPostAuth(req, res, next) {
  const token = req.cookies.token;
  const userID = req.cookies.userID;
  const defaultID = "Guest";

  if (!token) {
    res.json({ error: "Unknown user" });
  }
  if (!userID) {
    res.json({ error: "Unknown userID" });
  }
  if (userID.includes(defaultID)) {
    res.json({ error: "Guest User cannot modify the post" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
  }
}

function verify(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    res.status(401);
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ login: false });
  }
}

module.exports = { checkToken, verify, modifyPostAuth };
