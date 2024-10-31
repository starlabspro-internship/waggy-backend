const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/list', ratingController.getAllRatings);

router.post('/new', ratingController.createRating);

router.get('/view/:id', ratingController.getRatingById);

router.put('/edit/:id', ratingController.updateRating);

router.delete('/remove/:id', ratingController.deleteRating);

const registerRoutes = (app) => {
    app.use('/api/ratings', router); 
  };
  
module.exports = registerRoutes;