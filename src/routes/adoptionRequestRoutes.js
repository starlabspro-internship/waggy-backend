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
  '/new',
  createAdoptionRequest
);
router.get('/list', getAdoptionRequests);
router.get(
  '/view/:id',
  getAdoptionRequestById
);
router.put(
  '/edit/:id',
  updateAdoptionRequest
);
router.delete(
  '/remove/:id',
  deleteAdoptionRequest
);
const registerRoutes = (app) => {
  app.use('/api/adoption-requests', router); 
};

module.exports = registerRoutes;
