const express = require('express');
const AdoptionHistoryController = require('../controllers/adoptionHistoryController');

const router = express.Router();

router.post(
  '/',
  AdoptionHistoryController.createAdoptionHistory
);
router.get('/', AdoptionHistoryController.getAdoptionHistories);
router.get(
  '/:id',
  AdoptionHistoryController.getAdoptionHistoryById
);
router.put(
  '/:id',
  AdoptionHistoryController.updateAdoptionHistory
);
router.delete(
  '/:id',
  AdoptionHistoryController.deleteAdoptionHistory
);
const registerRoutes = (app) => {
  app.use('/api/adoption-history', router); 
};

module.exports = registerRoutes;
