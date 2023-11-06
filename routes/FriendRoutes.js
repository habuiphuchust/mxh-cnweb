const express = require("express");
const {
    getAllFriends,
    getFriendById,
    getFriendByUser,
    createFriend,
    deleteFriend
} = require("../controllers/FriendController");

const router = express.Router();

router.route("/").get(getAllFriends).post(createFriend);
router.route("/user/:id").get(getFriendByUser);
router.route("/:id").get(getFriendById).delete(deleteFriend);

module.exports = router;
