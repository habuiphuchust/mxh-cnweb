const https = require("https");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const Router = require("./routes/index.js");
const cors = require("cors");

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
      "mongodb://localhost:27017/mangxahoi"
  )
  .catch((err) => {
    console.log(err);
  });
  
const app = express();

  // link mac dinh
app.use(express.static("public"));

app.use(cors({ methods: "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true }));
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
app.use("/", Router);



// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server is running on port ${process.env.PORT || 8080}`);
// });

// Tạo máy chủ HTTPS
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});

module.exports = app;
