const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/list', petController.getAllPets);

router.post('/new', petController.createPet);

router.get('/view/:id', petController.getPetById);

router.put('/edit/:id', petController.updatePet);

router.delete('/remove/:id', petController.deletePet);

const registerRoutes = (app) => {
    app.use('/api/pets', router); 
  };
module.exports = registerRoutes;