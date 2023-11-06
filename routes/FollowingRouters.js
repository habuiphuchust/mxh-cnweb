const express = require("express");
const {
    getAllFollowings,
    getFollowingById,
    createFollowing,
    deleteFollowing
} = require("../controllers/FollowingController");

const router = express.Router();

router.route("/").get(getAllFollowings).post(createFollowing);
router.route("/:id").get(getFollowingById).delete(deleteFollowing);

module.exports = router;
