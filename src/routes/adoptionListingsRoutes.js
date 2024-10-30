const express = require('express');
const {
  createAdoptionListing,
  getAdoptionListings,
  getAdoptionListingById,
  updateAdoptionListing,
  deleteAdoptionListing,
} = require('../controllers/adoptionListingsController');

const router = express.Router();

// Routes for Adoption Listings
router.post('/', createAdoptionListing); // POST /api/adoption-listings
router.get('/', getAdoptionListings); // GET /api/adoption-listings
router.get('/:id', getAdoptionListingById); // GET /api/adoption-listings/:id
router.put('/:id', updateAdoptionListing); // PUT /api/adoption-listings/:id
router.delete('/:id', deleteAdoptionListing); // DELETE /api/adoption-listings/:id

const registerRoutes = (app) => {
  app.use('/api/adoption-listings', router); // Use /api/adoption-listings as base path
};

module.exports = registerRoutes;