const express = require('express');
const router = express.Router();
const matchHistoryController = require('../controllers/matchHistoryController');

// Routes for Match History
router.post('/', matchHistoryController.createMatchHistory);
router.get('/', matchHistoryController.getMatchHistories);
router.get('/:id', matchHistoryController.getMatchHistoryById);
router.put('/:id', matchHistoryController.updateMatchHistory);
router.delete(
  '/:id',
  matchHistoryController.deleteMatchHistory
);
const registerRoutes = (app) => {
  app.use('/api/match-history', router);
};

module.exports = registerRoutes;
