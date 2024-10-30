const express = require('express');
const router = express.Router();
const adoptionListingController = require('../controllers/adoptionListingsController');

// Routes for Adoption Listings
router.post(
  '/',
  adoptionListingController.createAdoptionListing
);
router.get('/', adoptionListingController.getAdoptionListings);
router.get(
  '/:id',
  adoptionListingController.getAdoptionListingById
);
router.put(
  '/:id',
  adoptionListingController.updateAdoptionListing
);
router.delete(
  '/:id',
  adoptionListingController.deleteAdoptionListing
);
const registerRoutes = (app) => {
  app.use('/api/adoption-listing', router); 
}; 
module.exports = registerRoutes;
