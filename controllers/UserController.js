const UserService = require("../services/UserService");

exports.getAllUsers = async (req, res) => {
  try {
    const Users = await UserService.getAllUsers();
    res.json({ data: Users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const User = await UserService.createUser(req.body);
    res.json({ data: User, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const User = await UserService.getUserById(req.params.id);
    res.json({ data: User, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const User = await UserService.updateUser(req.params.id, req.body);
    res.json({ data: User, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const User = await UserService.deleteUser(req.params.id);
    res.json({ data: User, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};
