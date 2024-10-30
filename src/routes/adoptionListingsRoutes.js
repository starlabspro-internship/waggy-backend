const express = require('express');
const {
  createAdoptionListing,
  getAdoptionListings,
  getAdoptionListingById,
  updateAdoptionListing,
  deleteAdoptionListing,
} = require('../controllers/adoptionListingController');

const router = express.Router();

router.post('/adoption-listings', createAdoptionListing); 
router.get('/adoption-listings', getAdoptionListings); 
router.get('/adoption-listings/:id', getAdoptionListingById); 
router.put('/adoption-listings/:id', updateAdoptionListing); 
router.delete('/adoption-listings/:id', deleteAdoptionListing); 

const registerRoutes = (app) => {
    app.use('/api', router); 
};

module.exports = registerRoutes;
