const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// create a profile router
router.post("/profile", profileController.createProfile);
// get all profiles router
router.get("/profile", profileController.getAllProfiles);
// get one user by ID router
router.get("/profile/:id", profileController.getProfileById);
// update one profile by ID router
router.put("/profile/:id", profileController.updateProfile);
// delete one profile by ID router
router.delete("/profile/:id", profileController.deleteProfile);

module.exports = router;
