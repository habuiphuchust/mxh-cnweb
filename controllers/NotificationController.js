const NotificationService = require("../services/Notificationservice");

exports.getAllNotifications = async (req, res) => {
  try {
    const Notifications = await NotificationService.getAllNotifications();
    res.json({ data: Notifications, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const Notification = await NotificationService.createNotification(req.body);
    res.json({ data: Notification, status: "success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const Notification = await NotificationService.getNotificationById(req.params.id);
    res.json({ data: Notification, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const Notification = await NotificationService.updateNotification(req.params.id, req.body);
    res.json({ data: Notification, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const Notification = await NotificationService.deleteNotification(req.params.id);
    res.json({ data: Notification, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
};
exports.deleteReadedNotificationByUserId = async (req, res) => {
  try {
    const Notification = await NotificationService.deleteReadedNotificationByUserId(req.params.id);
    res.json({ data: Notification, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  } 
};
exports.getUnreadNotificationByUserId = async (req, res) => {
  try {
    const Notifications = await NotificationService.getUnreadNotificationByUserId(req.params.id);
    res.json({ data: Notifications, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message, status: "fail" });
  }
}
