const express = require("express");
const router = express.Router();
const matchingRequestController = require("../controllers/matchingRequestContoller");

const authMiddleware = require('../middleware/auth');

router.post("/new", authMiddleware, matchingRequestController.createMatchingRequest);
router.get("/list",authMiddleware, matchingRequestController.getAllMatchingRequests);
router.get("/view/:receiverPetId",authMiddleware, matchingRequestController.getMatchingRequestStatus);
router.put("/edit/:id", matchingRequestController.updateMatchingRequestStatus);
router.delete("/remove/:id", matchingRequestController.deleteMatchingRequest);


const matchRequestRoutes = (app) => {
    app.use('/api/match-request', router); 
  };

module.exports = matchRequestRoutes;
