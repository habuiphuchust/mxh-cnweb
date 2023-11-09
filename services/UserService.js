const UserModel = require("../models/User");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (User) => {
  const newUser = new UserModel(User);
  return await newUser.save();
};
exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.getUserByEmail = async (user_email) => {
  return await UserModel.findOne({user_email});
}

exports.updateUser = async (id, User) => {
  return await UserModel.findByIdAndUpdate(id, User);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};