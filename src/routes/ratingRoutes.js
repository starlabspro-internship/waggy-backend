const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/ratings', ratingController.getAllRatings);

router.post('/ratings', ratingController.createRating);

router.get('/ratings/:id', ratingController.getRatingById);

router.put('/ratings/:id', ratingController.updateRating);

router.delete('/ratings/:id', ratingController.deleteRating);

module.exports = router;
