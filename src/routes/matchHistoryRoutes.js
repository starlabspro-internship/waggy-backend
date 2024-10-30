const express = require('express');
const router = express.Router();
const matchHistoryController = require('../controllers/matchHistoryController');

// Routes for Match History
router.post('/match-histories', matchHistoryController.createMatchHistory);
router.get('/match-histories', matchHistoryController.getMatchHistories);
router.get('/match-histories/:id', matchHistoryController.getMatchHistoryById);
router.put('/match-histories/:id', matchHistoryController.updateMatchHistory);
router.delete(
  '/match-histories/:id',
  matchHistoryController.deleteMatchHistory
);

module.exports = router;
