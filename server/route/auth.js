const app = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/create.user.model");
const { registerValidation, loginValidation } = require("../models/validation");
const defaultVal = require("../default-val");
const auth = require("./verify-token");
const addGuest = require("../models/guest-total");
const today = require("../models/date");

///////////////REGISTER///////////////
app.post("/signup", async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //validate email
  const emailExist = await User.findOne({ email: req.body.email });
  const usernameExist = await User.findOne({ userName: req.body.userName });
  if (emailExist) return res.json("error: Email is already exist");
  if (usernameExist) return res.json("error: Username is already taken");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPasword = await bcrypt.hash(req.body.password, salt);

  const userName = req.body.userName;
  const email = req.body.email;
  const password = hashedPasword;
  const createdDate = today;

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
    .json({ register: "success" });
});

///////////////LOGIN////////////////
app.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json("Email doesn't exist");

  //check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.json("Please enter the valid password");

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
    .json({ login: "success" });
});

///////////CHECK GUEST OR NEW VISITOR///////////////
app.get("/checkLogin", auth.checkToken, (req, res) => {
  User.findOne({ _id: req.cookies.userID }, (err, result) => {
    if (!result) {
      res.json({
        login: true,
        userID: req.cookies.userID,
        userName: req.cookies.userID,
      });
    } else {
      res.json({
        login: true,
        userID: req.cookies.userID,
        userName: result.userName,
      });
    }
  });
});

//////////GENERATE GUEST TOKEN//////////////
app.post("/generateGuestToken", (req, res) => {
  addGuest.findByIdAndUpdate("5f98f21d87852a277872be51").then((count) => {
    const GuestCount = count.GuestCount + 1;
    count.GuestCount = GuestCount;
    count
      .save()
      .then(() => {
        const token = jwt.sign(defaultVal.defaultID, process.env.SECRET_TOKEN);
        const cookiePush = { token: token, userId: defaultVal.defaultID };
        res
          .cookie("token", token, {
            maxAge: "900000",
            httpOnly: false,
            domain: defaultVal.cookieDomain,
          })
          .cookie("userID", `Guest${GuestCount}`, {
            maxAge: "900000",
            httpOnly: false,
            domain: defaultVal.cookieDomain,
          })
          .cookie("userName", `Guest${GuestCount}`, {
            maxAge: "900000",
            httpOnly: false,
            domain: defaultVal.cookieDomain,
          })
          .json({ userName: `Guest${GuestCount}` });
      })
      .catch((err) => console.log(err));
  });
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
