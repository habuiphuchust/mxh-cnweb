const express = require("express");
const {
    getAllNotifications,
    getNotificationById,
    getUnreadNotificationByUserId,
    createNotification,
    updateNotification,
    deleteNotification,
    deleteReadedNotificationByUserId
} = require("../controllers/NotificationController");

const router = express.Router();

router.route("/").get(getAllNotifications).post(createNotification);
router.route("/user/:id").get(getUnreadNotificationByUserId).delete(deleteReadedNotificationByUserId);
router.route("/:id").get(getNotificationById).put(updateNotification).delete(deleteNotification);

module.exports = router;
