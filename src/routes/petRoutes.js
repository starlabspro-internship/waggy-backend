const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const upload = require('../middleware/upload')
const authMiddleware = require('../middleware/auth');

router.get('/list', authMiddleware, petController.getAllPets);

router.post('/new',authMiddleware, upload.single('petPicture'), petController.createPet);

router.get('/view/:id',authMiddleware, petController.getPetById);

// router.put('/edit/:id',upload.single('petPicture'),authMiddleware, petController.updatePet);
router.put('/edit/:id', authMiddleware, upload.single('petPicture'), petController.updatePet);


router.delete('/remove/:id', authMiddleware, petController.deletePet);

const registerRoutes = (app) => {
    app.use('/api/pets', router); 
  };
module.exports = registerRoutes;