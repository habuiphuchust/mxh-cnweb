const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');

router.post('/send-message', messageController.sendMessage);
router.get('/get-friends/:userId', messageController.getFriends);
router.get('/get-messages/:userId/:friendId', messageController.getMessages);
module.exports = router;