const express = require('express');
const {
  createAdoptionRequest,
  getAdoptionRequests,
  getAdoptionRequestById,
  updateAdoptionRequest,
  deleteAdoptionRequest,
} = require('../controllers/adoptionRequestController');

const router = express.Router();


// Routes for Adoption Requests
router.post(
  '/',
  createAdoptionRequest
);
router.get('/', getAdoptionRequests);
router.get(
  '/:id',
  getAdoptionRequestById
);
router.put(
  '/:id',
  updateAdoptionRequest
);
router.delete(
  '/:id',
  deleteAdoptionRequest
);
const registerRoutes = (app) => {
  app.use('/api/adoption-requests', router); 
};

module.exports = registerRoutes;
