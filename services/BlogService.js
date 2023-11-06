const BlogModel = require("../models/Blog");

exports.getAllBlogs = async () => {
  return await BlogModel.find();
};

exports.createBlog = async (blog) => {
  const newBlog = new BlogModel(blog);
  // return await BlogModel.create(blog);
  return await newBlog.save();
};
exports.getBlogById = async (id) => {
  return await BlogModel.findById(id);
};
exports.getBlogByTitle = async (title) => {
  let search = new RegExp(title, "i");
  return await BlogModel.find({title: search});
};
exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

exports.deleteBlog = async (id) => {

  return await BlogModel.findByIdAndDelete(id);
};
exports.deleteAllBlog = async () => {
  return await BlogModel.deleteMany();
}
