const https = require("https");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const {apiRouter, authRouters, signupRouter} = require("./routes/index.js");

const mongoose = require("mongoose");
require("dotenv").config();

// Đọc chứng chỉ và private key
const credentials = {
  key: fs.readFileSync("./key/key.pem", "utf8"),
  cert: fs.readFileSync("./key/server.crt", "utf8"),
};

// connect to mongodb
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority"
  )
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

//session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// router
app.use("/api", apiRouter);
app.use("/auth", authRouters);
app.use("/signup", signupRouter);

app.get("/logined", (req, res) => {
  console.log(req.session);
  res.send("đã login nhé");
});

// link mac dinh
app.use(express.static("public"));
//configure mongoose

//middleware

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server is running on port ${process.env.PORT || 8080}`);
// });

// Tạo máy chủ HTTPS
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});

module.exports = app;
