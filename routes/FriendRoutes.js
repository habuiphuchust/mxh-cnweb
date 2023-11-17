const express = require("express");
const {
    getAllFriends,
    checkFriend,
    getFriendByUser,
    createFriend,
    deleteFriend
} = require("../controllers/FriendController");

const router = express.Router();

router.route("/").get(getAllFriends).post(createFriend);
router.route("/user/:id").get(getFriendByUser);
router.route("/delete").post(deleteFriend);
router.route('/check').post(checkFriend)

module.exports = router;
