const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: String,
    user_email: String,
    user_password: String,
    user_fullname: String,
    user_gender: String,
    user_picture: String,
    user_cover: String,
    user_work_title: String,
    user_work_placeplace: String,
    user_current_city: String,
    user_hometown: String,
    user_birthday: {
        type: Date,
        default: Date.parse("2002-02-20")
    },
    user_registered: {
        type: Date,
        default: Date.now
    },
    user_last_login: {
        type: Date,
        default: Date.now
    },
    user_activated: String,
    user_ip: String,
    // user_live_requests_conter: Number,
    // user_live_requests_lastid: String,
    // user_live_messages_conter: Number,
    // user_live_messages_lastid: String,
    // user_live_notifications_counter: Number,
    // user_live_notifications_lastid: String,
    facebook_connected: String,
    facebook_id: String
});

module.exports = mongoose.model("user", userSchema);
