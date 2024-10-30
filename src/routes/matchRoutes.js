const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getAllMatches);

router.post('/', matchController.createMatch);

router.get('/:id', matchController.getMatchById);

router.put('/:id', matchController.updateMatch);

router.delete('/:id', matchController.deleteMatch);

const registerRoutes = (app) => {
    app.use('/api', router); 
  };
module.exports = registerRoutes;