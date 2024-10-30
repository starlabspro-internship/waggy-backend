const express = require('express');
const AdoptionHistoryController = require('../controllers/adoptionHistoryController');

const router = express.Router();

router.post(
  '/adoption-history',
  AdoptionHistoryController.createAdoptionHistory
);
router.get('/adoption-history', AdoptionHistoryController.getAdoptionHistories);
router.get(
  '/adoption-history/:id',
  AdoptionHistoryController.getAdoptionHistoryById
);
router.put(
  '/adoption-history/:id',
  AdoptionHistoryController.updateAdoptionHistory
);
router.delete(
  '/adoption-history/:id',
  AdoptionHistoryController.deleteAdoptionHistory
);

module.exports = router;
