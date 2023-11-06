const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  deleteAllBlog,
  getBlogByTitle
} = require("../controllers/BlogController");

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog).delete(deleteAllBlog);
router.route("/:id").get(getBlogByTitle).put(updateBlog).delete(deleteBlog);

module.exports = router;
