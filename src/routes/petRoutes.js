const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const upload = require('../middleware/upload')
router.get('/list', petController.getAllPets);

router.post('/new', upload.single('petPicture'), petController.createPet);

router.get('/view/:id', petController.getPetById);

router.put('/edit/:id',upload.single('petPicture'), petController.updatePet);

router.delete('/remove/:id', petController.deletePet);

const registerRoutes = (app) => {
    app.use('/api/pets', router); 
  };
module.exports = registerRoutes;