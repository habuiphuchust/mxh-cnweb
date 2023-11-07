const express = require("express");
const session = require('express-session');
const apiRouter = require("./routes/index.js");
const authRouter = require("./routes/auth.js")

const mongoose = require("mongoose");
require("dotenv").config()

// connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority"
).catch(err => {
  console.log(err);
});


const app = express();
app.use(express.json());

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// router
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// link mac dinh
app.use(express.static('public'));
//configure mongoose

//middleware


app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

module.exports = app;
