const express = require("express");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
router.route("/:id").get(getUserById).put(upload.array('images', 2) ,updateUser).delete(deleteUser);

module.exports = router;
