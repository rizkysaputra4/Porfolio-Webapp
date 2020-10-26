const app = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/create.user.model");
const { registerValidation, loginValidation } = require("../models/validation");
const defaultVal = require("../default-val");
const auth = require("./verify-token");

///////////////REGISTER///////////////
app.post("/signup", async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate email
  const emailExist = await User.findOne({ email: req.body.email });
  const usernameExist = await User.findOne({ userName: req.body.userName });
  if (emailExist) return res.status(400).send("error: email is already exist");
  if (usernameExist)
    return res.status(400).send("error: username is already taken");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPasword = await bcrypt.hash(req.body.password, salt);

  const userName = req.body.userName;
  const email = req.body.email;
  const password = hashedPasword;
  const createdDate = Date.now(req.body.createdDate);

  const createUser = new User({
    userName,
    email,
    password,
    createdDate,
  });

  createUser.save();

  const token = jwt.sign({ _id: createUser._id }, process.env.SECRET_TOKEN);
  res
    .cookie("token", token, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .cookie("userID", createUser._id, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .cookie("userName", createUser.userName, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .json({ userName: createUser.myUserName });
});

///////////////LOGIN////////////////
app.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("error: email doesnt exist");

  //check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Please enter the valid password");

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res
    .cookie("token", token, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .cookie("userID", user._id, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .cookie("userName", user.userName, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .json({ userName: user.userName });
});

///////////CHECK GUEST OR NEW VISITOR///////////////
app.get("/checkLogin", auth.checkToken, (req, res) => {
  res.json({
    login: "true",
    userID: req.cookies.userID,
    userName: "Guest",
  });
});

//////////GENERATE GUEST TOKEN//////////////
app.get("/generateGuestToken", (req, res) => {
  /* let i = 1;
  i++;
  console.log(i); */
  const token = jwt.sign(defaultVal.defaultID, process.env.SECRET_TOKEN);
  const cookiePush = { token: token, userId: defaultVal.defaultID };
  res
    .cookie("token", token, {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .cookie("userID", "Guest", {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .cookie("userName", "Guest", {
      maxAge: "900000",
      httpOnly: false,
      domain: defaultVal.cookieDomain,
    })
    .json({ userName: "Guest" });
});

/////////////LOGOUT//////////
app.get("/logout", (req, res) => {
  res.cookie("token", "logout", {
    maxAge: "0",
    httpOnly: false,
    domain: defaultVal.cookieDomain,
  });
  res.cookie("userID", "logout", {
    maxAge: "0",
    httpOnly: false,
    domain: defaultVal.cookieDomain,
  });
  res.json({ login: false });
  /* res.redirect("/") */
});

module.exports = app;
