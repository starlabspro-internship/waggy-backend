const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/', messagesController.sendMessage);
router.get('/:chatRoomId', messagesController.getMessages);

const registerRoutes = (app) => {
    app.use('/api/messages', router); 
  };
module.exports = registerRoutes;