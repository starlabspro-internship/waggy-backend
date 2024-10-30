const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/', ratingController.getAllRatings);

router.post('/', ratingController.createRating);

router.get('/:id', ratingController.getRatingById);

router.put('/:id', ratingController.updateRating);

router.delete('/:id', ratingController.deleteRating);

const registerRoutes = (app) => {
    app.use('/api/ratings', router); 
  };
  
module.exports = registerRoutes;