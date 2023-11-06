const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// comment
const commentSchema = new Schema({
    post_id: String,
    user_id: String,
    text: String,
    image: String,
    time: {
        type: Date,
        default: Date.now
    },
    likes: Number
})
module.exports = mongoose.model("comment", commentSchema )