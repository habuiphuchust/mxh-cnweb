const postService = require("../services/postservice");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllposts();
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createpost(req.body);
    res.json({ data: post, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postService.getpostById(req.params.id);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postService.updatepost(req.params.id, req.body);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await postService.deletepost(req.params.id);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};
exports.getPostByText = async (req, res) => {
  try {
    const posts = await postService.getpostByTitle(req.params.id);
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
}
