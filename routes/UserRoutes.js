const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getMyInfo
} = require("../controllers/UserController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route('/myinfo').get(getMyInfo);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
