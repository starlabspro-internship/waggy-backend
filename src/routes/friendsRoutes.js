const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.post('/', friendsController.addFriend);
router.get('/:userId', friendsController.getFriends);
const registerRoutes = (app) => {
    app.use('/api', router); 
  };
module.exports = registerRoutes;