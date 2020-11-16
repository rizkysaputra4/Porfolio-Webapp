const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const port = process.env.PORT || 443;

app.use(cors({ credentials: true, origin: "rizkyport.herokuapp.com" }));
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

app.listen(port, "127.0.0.1");

const guestRoute = require("./server/route/post-book");
/* const myPost = require("./server/route/my-post"); */
const auth = require("./server/route/auth");
const hobbies = require("./server/route/omdb-middleware");
app.use("/api", guestRoute);
/* app.use("/api", myPost); */
app.use("/api", auth);
app.use("/api", hobbies);

app.use("/", express.static("./client/build/"));
