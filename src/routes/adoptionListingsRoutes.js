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
router.post('/new', createAdoptionListing); // POST /api/adoption-listings
router.get('/list', getAdoptionListings); // GET /api/adoption-listings
router.get('/view/:id', getAdoptionListingById); // GET /api/adoption-listings/:id
router.put('/edit/:id', updateAdoptionListing); // PUT /api/adoption-listings/:id
router.delete('/remove/:id', deleteAdoptionListing); // DELETE /api/adoption-listings/:id

const registerRoutes = (app) => {
  app.use('/api/adoption-listings', router); // Use /api/adoption-listings as base path
};

module.exports = registerRoutes;