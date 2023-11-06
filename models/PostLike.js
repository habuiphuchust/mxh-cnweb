const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// post like
const postLikeSchema = new Schema({
    user_id: String,
    post_id: String
});
module.exports = mongoose.model("postlike", postLikeSchema);
