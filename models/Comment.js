const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// comment
const commentSchema = new Schema({
    post_id: String,
    comment_id: {
        type: String,
        default: 'none'
    },
    user_id: String,
    text: String,
    image: String,
    time: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model("comment", commentSchema )