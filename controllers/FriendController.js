const FriendService = require("../services/Friendservice");

exports.getAllFriends = async (req, res) => {
  try {
    const Friends = await FriendService.getAllFriends();
    res.json({ data: Friends, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.createFriend = async (req, res) => {
  try {
    const Friend = await FriendService.createFriend(req.body);
    res.json({ data: Friend, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getFriendById = async (req, res) => {
  try {
    const Friend = await FriendService.getFriendById(req.params.id);
    res.json({ data: Friend, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getFriendByUser = async (req, res) => {
    try {
      const Friend = await FriendService.getFriendsByUserId(req.params.id);
      res.json({ data: Friend, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message, status: "fail" });
    }
  };


exports.deleteFriend = async (req, res) => {
  try {
    const Friend = await FriendService.deleteFriend(req.params.id);
    res.json({ data: Friend, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

