const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    user_id: String,
    follower_id: String
});

module.exports = mongoose.model("following", followingSchema);