const NotificationModel = require("../models/Notification");

exports.getAllNotifications = async () => {
  return await NotificationModel.find();
};

exports.createNotification = async (Notification) => {
  const newNotification = new NotificationModel(Notification);
  return await newNotification.save();
};
exports.getNotificationById = async (id) => {
  return await NotificationModel.findById(id);
};

exports.getNotificationByUserId = async (id) => {
  return await NotificationModel.find({to_user_id: id});
};

exports.getUnreadNotificationByUserId = async (id) => {
    return await NotificationModel.find({to_user_id: id, seen: "false"});
  };
exports.updateNotification = async (id, Notification) => {
  return await NotificationModel.findByIdAndUpdate(id, Notification);
};

exports.deleteNotification = async (notify) => {
  return await NotificationModel.findOneAndDelete(notify);
};
exports.deleteReadedNotificationByUserId = async (id) => {
  return await NotificationModel.deleteMany({to_user_id: id, seen: "true"});
}