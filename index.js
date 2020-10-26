const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

const guestRoute = require("./server/route/post-book");
/* const myPost = require("./server/route/my-post"); */
const auth = require("./server/route/auth");
app.use("/api", guestRoute);
/* app.use("/api", myPost); */
app.use("/api", auth);

app.use("/", express.static("./build"));
