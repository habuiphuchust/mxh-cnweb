const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// comment like
const commentLikeSchema = new Schema({
    comment_id: String,
    user_id: String,
});
module.exports = mongoose.model("commentlike", commentLikeSchema);