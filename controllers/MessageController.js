const Message = require('../models/Message');

const getFriends = async (req, res) => {
    try {
      const { user_id } = req.params;
      const friends = await User.find({ _id: { $ne: user_id } });
      res.status(200).json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, text, image, timestamp });
    await message.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMessages = async (req, res) => {
    try {
      const { user_id, friend_id } = req.params;
      const messages = await Message.find({
        $or: [
          { sender: user_id, receiver: friend_id },
          { sender: friend_id, receiver: user_id },
        ],
      }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {getFriends, sendMessage, getMessages};
