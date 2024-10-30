const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/', petController.getAllPets);

router.post('/', petController.createPet);

router.get('/:id', petController.getPetById);

router.put('/:id', petController.updatePet);

router.delete('/:id', petController.deletePet);

const registerRoutes = (app) => {
    app.use('/api/pets', router); 
  };
module.exports = registerRoutes;