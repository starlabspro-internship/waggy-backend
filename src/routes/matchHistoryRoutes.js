const express = require('express');
const router = express.Router();
const matchHistoryController = require('../controllers/matchHistoryController');

// Routes for Match History
router.post('/new', matchHistoryController.createMatchHistory);
router.get('/list', matchHistoryController.getMatchHistories);
router.get('/view/:id', matchHistoryController.getMatchHistoryById);
router.put('/edit/:id', matchHistoryController.updateMatchHistory);
router.delete(
  '/remove/:id',
  matchHistoryController.deleteMatchHistory
);
const registerRoutes = (app) => {
  app.use('/api/match-history', router);
};

module.exports = registerRoutes;
