const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

const {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
} = profileController;



router.post('/', createProfile); // Create a new profile
router.get('/', getAllProfiles); // Get all profiles
router.get('/:id', getProfileById); // Get a profile by ID
router.put('/:id', updateProfile); // Update a profile by ID
router.delete('/:id', deleteProfile);


const registerRoutes = (app) => {
    app.use('/api/profiles', router); // Register the routes with the base path
  };



module.exports = registerRoutes;
