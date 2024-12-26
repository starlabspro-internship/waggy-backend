const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const authMiddleware = require('../middleware/auth');
// Route to create a message
router.post('/send', authMiddleware, messagesController.createMessage);

// Route to get all chats for a user
router.get('/view/:otherUserId' , authMiddleware, messagesController.getConversation);

// Route to get messages between two users


// Register routes
const registerRoutes = (app) => {
  app.use('/api/messages', router);
};

module.exports = registerRoutes;
