const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../middleware/upload');

const {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = profileController;

router.post('/new', createProfile); // Create a new profile
router.get('/list', getAllProfiles); // Get all profiles
router.get('/view/:id', getProfileById); // Get a profile by ID
router.put('/edit/:id', upload.single('profilePicture'), updateProfile); // Update a profile by ID
router.delete('/remove/:id', deleteProfile);

const registerRoutes = (app) => {
  app.use('/api/profiles', router); // Register the routes with the base path
};

module.exports = registerRoutes;
