const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/send', messagesController.sendMessage);
router.get('/chat/:chatRoomId', messagesController.getMessages);

const registerRoutes = (app) => {
    app.use('/api/messages', router); 
  };
module.exports = registerRoutes;