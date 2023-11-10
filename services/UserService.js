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

exports.getUserByFacebookId = async (facebook_id) => {
  return await UserModel.findOne({facebook_id})
}

exports.getUserByGoogleId = async (google_id) => {
  return await UserModel.findOne({google_id})
}

exports.updateUser = async (id, User) => {
  return await UserModel.findByIdAndUpdate(id, User);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};