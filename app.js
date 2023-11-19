const https = require("https");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const Router = require("./routes/index.js");
const cors = require("cors");
const {Server} = require('socket.io')
const UserService = require('./services/UserService.js')

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
const sessionMiddleware =   session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
})
app.use(
  sessionMiddleware
);

// router
app.use("/", Router);



// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server is running on port ${process.env.PORT || 8080}`);
// });

// Tạo máy chủ HTTPS va socket.io
const httpsServer = https.createServer(credentials, app);
const io = new Server(httpsServer, {
  cors: {
    origin: "http://localhost:3000"
  }
})
io.engine.use(sessionMiddleware)
io.on('connection', (socket) => {
  let user_id = null
  console.log('a user connected')
  socket.on('active', (_id) => {
    user_id = _id
    if (user_id) {
      UserService.setActived(user_id)
      socket.join(user_id)
    }
  })
  socket.on('notify', (data) => {
    socket.to(data.user_two_id).emit('notify', data.message)
  })
  socket.on('disconnect', () => {
    if (user_id) {
      UserService.unActived(user_id)
      socket.leave(user_id)
    }
  })
})

httpsServer.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});

module.exports = app;