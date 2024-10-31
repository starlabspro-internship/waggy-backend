const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/list', matchController.getAllMatches);

router.post('/new', matchController.createMatch);

router.get('/view/:id', matchController.getMatchById);

router.put('/edit/:id', matchController.updateMatch);

router.delete('/remove/:id', matchController.deleteMatch);

const registerRoutes = (app) => {
    app.use('/api/matches', router); 
  };
module.exports = registerRoutes;