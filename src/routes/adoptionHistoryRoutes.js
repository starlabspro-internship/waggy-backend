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
  '/new',
  createAdoptionHistory
);
router.get('/list', getAdoptionHistories);
router.get(
  '/view/:id',
  getAdoptionHistoryById
);
router.put(
  '/edit/:id',
  updateAdoptionHistory
);
router.delete(
  '/remove/:id',
  deleteAdoptionHistory
);
const registerRoutes = (app) => {
  app.use('/api/adoption-history', router); 
};

module.exports = registerRoutes;
