const express = require("express");
const {
    getAllPosts,
    getPostById,
    getPostByText,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/PostController");

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/search/:id").get(getPostByText);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
