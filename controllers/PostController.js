const postService = require("../services/PostService");
const Image = require('../models/Image')


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllposts();
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.createPost = async (req, res) => {
  if (!req.session?.passport?.user) {
    res.json({message: "chưa đăng nhập", status: "fail"})
    return;
  }
  try {
    const text = req.body?.status
    const photos = []
    const user_id = req.session.passport.user.user_id
    for (const image of req.files) {
      const newImage = await Image.create({
          name: image.originalname,
          contentType: image.mimetype,
          data: image.buffer
      })
      photos.push(newImage?._id)
    }
    const newPost = await postService.createPost({user_id, text, photos})

    res.json({ data: newPost, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message, status: "fail" });
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
  if (!req.session?.passport?.user) {
    res.json({message: "chưa đăng nhập", status: "fail"})
    return;
  }
  const post = await postService.getPostById(req.params.id);
  if (req.session.passport.user.user_id != post?.user_id) {
    res.json({message:"bạn không có quyền sửa", status:"success"})
    return;
  }
  try {
    const text = req.body?.status
    const photos = post.photos
    for (const image of req.files) {
      const newImage = await Image.create({
          name: image.originalname,
          contentType: image.mimetype,
          data: image.buffer
      })
      photos.push(newImage?._id)
    }
    const oldPost = await postService.updatePost(req.params.id, {text, photos})
    const newPost = await postService.getPostById(req.params.id);

    res.json({ data: newPost, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message, status: "fail" });
  }
};

exports.deletePost = async (req, res) => {
  if (!req.session?.passport?.user) {
    res.json({message: "chưa đăng nhập", status: "fail"})
    return;
  }
  const post = await postService.getPostById(req.params.id);
  if (req.session.passport.user.user_id != post?.user_id) {
    res.json({message:"bạn không có quyền xóa", status:"success"})
    return;
  }
  try {
    const photos = post.photos
    for (const image of photos) {
      await Image.findByIdAndDelete(image);
    }
    const result = await postService.deletePost(req.params.id)

    res.json({ message: result, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message, status: "fail" });
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

exports.getPostByUserId = async (req, res) => {
  if (!req.session?.passport?.user) {
    res.json({message: "chưa đăng nhập", status: "fail"})
    return;
  }
  try {
    const posters = await (await postService.getPostByUserId(req.params.id))
    res.json({ data: posters, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message, status: "fail" });
  }
}