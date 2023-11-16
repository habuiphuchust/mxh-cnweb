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
    console.log(err);
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getUserById = async (req, res) => {
  if (!req.session?.passport?.user) {
    res.json({message: "chưa đăng nhập", status: "fail"})
    return;
  }
  try {
    const {
      user_name,
      user_fullname,
      user_gender,
      user_picture,
      user_cover,
      user_work_title,
      user_work_place,
      user_current_city,
      user_hometown,
      user_birthday,
      user_registered,
      user_last_login,
      user_activated,
    } = await UserService.getUserById(req.params.id);
    res.json({
      data: {
        user_name,
        user_fullname,
        user_gender,
        user_picture,
        user_cover,
        user_work_title,
        user_work_place,
        user_current_city,
        user_hometown,
        user_birthday,
        user_registered,
        user_last_login,
        user_activated,
      },
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ message: err.message, status: "fail" });
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

exports.getMyInfo = async (req, res) => {
  if (!req.session?.passport?.user) {
    res.json({message: "chưa đăng nhập", status: "fail"})
    return;
  }
  try {
    User = await UserService.getUserById(req.session.passport.user.user_id);
    res.json({data: User, status: "success"})
  } catch (error) {
    res.status(500).json({ message: err.message, status: "fail" });
  }

}
