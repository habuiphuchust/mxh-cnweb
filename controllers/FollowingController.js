const FollowingService = require("../services/FollowingService");

exports.getAllFollowings = async (req, res) => {
  try {
    const Followings = await FollowingService.getAllFollowings();
    res.json({ data: Followings, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.createFollowing = async (req, res) => {
  try {
    const Following = await FollowingService.createFollowing(req.body);
    res.json({ data: Following, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getFollowingById = async (req, res) => {
  try {
    const Following = await FollowingService.getFollowingById(req.params.id);
    res.json({ data: Following, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};


exports.deleteFollowing = async (req, res) => {
  try {
    const Following = await FollowingService.deleteFollowing(req.params.id);
    res.json({ data: Following, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

