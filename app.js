const express = require("express");
const apiRouter = require("./routes/index.js")

const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect(
   process.env.MONGODB_URI || "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).catch(err => {
  console.log(err);
});



const app = express();
app.use(express.json());

// router
app.use("/api", apiRouter);

// link mac dinh
app.use(express.static('public'));
//configure mongoose

//middleware

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

module.exports = app;
