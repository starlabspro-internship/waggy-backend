const express = require('express');
const {
  createAdoptionRequest,
  getAdoptionRequests,
  getAdoptionRequestById,
  updateAdoptionRequest,
  deleteAdoptionRequest,
} = require('../controllers/adoptionRequestController');

const router = express.Router();

router.post('/adoption-requests', createAdoptionRequest); 
router.get('/adoption-requests', getAdoptionRequests); 
router.get('/adoption-requests/:id', getAdoptionRequestById); 
router.put('/adoption-requests/:id', updateAdoptionRequest); 
router.delete('/adoption-requests/:id', deleteAdoptionRequest); 

const registerRoutes = (app) => {
    app.use('/api', router); 
};

module.exports = registerRoutes;
