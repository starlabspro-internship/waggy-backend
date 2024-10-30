const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.post('/add', friendsController.addFriend);
router.get('/:userId', friendsController.getFriends);

module.exports = router;