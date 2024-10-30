const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/matches', matchController.getAllMatches);

router.post('/matches', matchController.createMatch);

router.get('/matches/:id', matchController.getMatchById);

router.put('/matches/:id', matchController.updateMatch);

router.delete('/matches/:id', matchController.deleteMatch);

module.exports = router;
