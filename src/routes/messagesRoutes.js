const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

// Route to send a new message
router.post('/', messagesController.sendMessage);

// Route to get messages by chat room ID
router.get('/:chatRoomId', messagesController.getMessages);

module.exports = router;