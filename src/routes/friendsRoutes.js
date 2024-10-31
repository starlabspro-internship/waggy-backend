const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

// Route to add a friend request
router.post('/request', friendsController.addFriend);

// Route to get accepted friends
router.get('/accepted/:userId', friendsController.getAcceptedFriends);

// Route to update friendship status
router.put('/:id/status', friendsController.updateFriendshipStatus);

// Route to delete a friendship
router.delete('/:id', friendsController.deleteFriendship);

// Route to get specific friendship details
router.get('/details/:id', friendsController.getFriendshipDetails);

const registerRoutes = (app) => {
  app.use('/api/friends', router); 
};

module.exports = registerRoutes;