const express = require('express');
const router = express.Router();
const adoptionListingController = require('../controllers/adoptionListingController');

// Routes for Adoption Listings
router.post(
  '/adoption-listings',
  adoptionListingController.createAdoptionListing
);
router.get('/adoption-listings', adoptionListingController.getAdoptionListings);
router.get(
  '/adoption-listings/:id',
  adoptionListingController.getAdoptionListingById
);
router.put(
  '/adoption-listings/:id',
  adoptionListingController.updateAdoptionListing
);
router.delete(
  '/adoption-listings/:id',
  adoptionListingController.deleteAdoptionListing
);

module.exports = router;
