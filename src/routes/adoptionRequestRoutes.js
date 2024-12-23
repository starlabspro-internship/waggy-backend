const express = require('express');
const {
  createAdoptionRequest,
  getAdoptionRequests,
  getAdoptionRequestById,
  updateAdoptionRequest,
  deleteAdoptionRequest,
} = require('../controllers/adoptionRequestController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();


// Routes for Adoption Requests
router.post(
  '/new',authMiddleware,
  createAdoptionRequest
);
router.get('/list',authMiddleware, getAdoptionRequests);
router.get(
  '/view/:id',authMiddleware , 
  getAdoptionRequestById
);
router.patch(
  '/edit/:id', authMiddleware , 
  updateAdoptionRequest
);
router.delete(
  '/remove/:id', authMiddleware , 
  deleteAdoptionRequest
);
const registerRoutes = (app) => {
  app.use('/api/adoption-requests', router); 
};

module.exports = registerRoutes;
