const express = require('express');
const {
  createAdoptionListing,
  getAdoptionListings,
  getAdoptionListingById,
  updateAdoptionListing,
  deleteAdoptionListing,
} = require('../controllers/adoptionListingsController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Routes for Adoption Listings
router.post('/new',authMiddleware, createAdoptionListing); 
router.get('/list' ,authMiddleware, getAdoptionListings); 
router.get('/view/:id',authMiddleware, getAdoptionListingById); 
router.put('/edit/:id',authMiddleware, updateAdoptionListing); 
router.delete('/remove/:id', deleteAdoptionListing); 

const registerRoutes = (app) => {
  app.use('/api/adoption-listings', router); 
};

module.exports = registerRoutes;