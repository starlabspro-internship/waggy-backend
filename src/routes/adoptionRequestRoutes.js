const express = require('express');
const router = express.Router();
const adoptionRequestController = require('../controllers/adoptionRequestController');

// Routes for Adoption Requests
router.post(
  '/adoption-requests',
  adoptionRequestController.createAdoptionRequest
);
router.get('/adoption-requests', adoptionRequestController.getAdoptionRequests);
router.get(
  '/adoption-requests/:id',
  adoptionRequestController.getAdoptionRequestById
);
router.put(
  '/adoption-requests/:id',
  adoptionRequestController.updateAdoptionRequest
);
router.delete(
  '/adoption-requests/:id',
  adoptionRequestController.deleteAdoptionRequest
);

module.exports = router;
