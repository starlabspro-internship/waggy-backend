const express = require('express');
const router = express.Router();
const adoptionRequestController = require('../controllers/adoptionRequestController');

// Routes for Adoption Requests
router.post(
  '/',
  adoptionRequestController.createAdoptionRequest
);
router.get('/', adoptionRequestController.getAdoptionRequests);
router.get(
  '/:id',
  adoptionRequestController.getAdoptionRequestById
);
router.put(
  '/:id',
  adoptionRequestController.updateAdoptionRequest
);
router.delete(
  '/:id',
  adoptionRequestController.deleteAdoptionRequest
);
const registerRoutes = (app) => {
  app.use('/api/adoption-requests', router); 
};

module.exports = registerRoutes;
