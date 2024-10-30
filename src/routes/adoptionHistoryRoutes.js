const express = require('express');
const {
  createAdoptionHistory,
  getAdoptionHistories,
  getAdoptionHistoryById,
  updateAdoptionHistory,
  deleteAdoptionHistory,
} = require('../controllers/adoptionHistoryController');

const router = express.Router();

router.post(
  '/',
  createAdoptionHistory
);
router.get('/', getAdoptionHistories);
router.get(
  '/:id',
  getAdoptionHistoryById
);
router.put(
  '/:id',
  updateAdoptionHistory
);
router.delete(
  '/:id',
  deleteAdoptionHistory
);
const registerRoutes = (app) => {
  app.use('/api/adoption-history', router); 
};

module.exports = registerRoutes;
