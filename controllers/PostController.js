const postService = require("../services/PostService");
const Image = require('../models/Image')
const FriendService = require('../services/FriendService')
const UserService = require('../services/UserService')


exports.getAllPosts = async (req, res) => {
  try {
    if (!req.session?.passport?.user) {
      res.json({message: "chưa đăng nhập", status: "fail"})
      return;
    }
    const user_id = req.session.passport.user.user_id
    const friends = await FriendService.getFriendsByUserId(user_id);
    let posters = [];
    const posts_users = [];
    for (let friend of friends) {
      if (friend.user_one_id === user_id) {
        let posts = await postService.getPostByUserId(friend.user_two_id)
        posters = [...posters, ...posts]
      } else {
        let posts = await postService.getPostByUserId(friend.user_one_id)
        posters = [...posters, ...posts]
      }
    }
    const my_posters = await postService.getPostByUserId(user_id);
    posters = [...posters, ...my_posters]
    for (let poster of posters) {
      const {
        _id,
        user_fullname,
        user_picture,
        user_cover,
        user_activated,
      } = await UserService.getUserById(poster.user_id);
      const user = {
        _id,
        user_fullname,
        user_picture,
        user_cover,
        user_activated,
      }
      const poster_user = {...poster._doc, user: user}
      posts_users.push(poster_user);
    }

    res.json({data: posts_users, status: 'success'})

  } catch (err) {
    res.status(500).json({ message: err.message, status: "fail" });
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
    res.json({message:"bạn không có quyền sửa", status:"fail"})
    return;
  }
  try {
    const text = req.body?.status
    const imageRemove = JSON.parse(req.body?.imageRemove)
    let photos = post.photos
    for (const image of req.files) {
      const newImage = await Image.create({
          name: image.originalname,
          contentType: image.mimetype,
          data: image.buffer
      })
      photos.push(newImage?._id)
    }
    for (const image of imageRemove) {
      await Image.findByIdAndDelete(image);
      photos = photos.filter(value => value !== image)
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
    res.json({message:"bạn không có quyền xóa", status:"fail"})
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
  try {
    const posters = await (await postService.getPostByUserId(req.params.id))
    res.json({ data: posters, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message, status: "fail" });
  }
}