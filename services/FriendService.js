const FriendModel = require("../models/Friend");

exports.getAllFriends = async () => {
  return await FriendModel.find();
};

exports.createFriend = async (Friend) => {
  const newFriend = new FriendModel(Friend);
  return await newFriend.save();
};
exports.getFriendById = async (id) => {
  return await FriendModel.findById(id);
};
exports.getFriendsByUserId = async (id) => {
  return await FriendModel.find({$or: [{user_one_id: id}, {user_two_id: id}]});
};

exports.deleteFriend = async (id) => {
  return await FriendModel.findByIdAndDelete(id);
};
exports.deleteAllFriend = async () => {
  return await FriendModel.deleteMany();
}