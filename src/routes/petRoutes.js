const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/pets', petController.getAllPets);

router.post('/pets', petController.createPet);

router.get('/pets/:id', petController.getPetById);

router.put('/pets/:id', petController.updatePet);

router.delete('/pets/:id', petController.deletePet);

module.exports = router;
