const express = require("express");
const router = express.Router();
const matchingListingController = require("../controllers/matchingListingController");
const authMiddleware = require('../middleware/auth');

router.post("/new", authMiddleware, matchingListingController.createMatchingListing);
router.get("/list", matchingListingController.getAllMatchingListings);
router.get("/view/:id", matchingListingController.getMatchingListingById);
router.put("/edit/:id", matchingListingController.updateMatchingListing);
router.delete("/remove/:id", matchingListingController.deleteMatchingListing);

router.get("/view-pet/:id",authMiddleware,  matchingListingController.getMatchingListingByPetId);

const matchingListingRoutes = (app) => {
    app.use('/api/matching-list', router); 
  };

module.exports = matchingListingRoutes;
