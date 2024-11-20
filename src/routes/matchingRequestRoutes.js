const express = require("express");
const router = express.Router();
const matchingRequestController = require("../controllers/matchingRequestContoller");

const authMiddleware = require('../middleware/auth');

router.post("/new", authMiddleware, matchingRequestController.createMatchingRequest);

router.get("/list-accepted",authMiddleware, matchingRequestController.getAllAcceptedRequests);
router.get("/list-sender",authMiddleware, matchingRequestController.getAllMatchingRequestsOfTheSender);
router.get("/list-received",authMiddleware, matchingRequestController.getAllInvitationsForUser);



router.get("/view/:receiverPetId",authMiddleware, matchingRequestController.getMatchingRequestStatus);

router.get("/view-id/:matchRequestId",authMiddleware, matchingRequestController.getMatchingRequestStatusbyId);
router.put("/edit/:id", authMiddleware, matchingRequestController.updateMatchingRequestStatus);
router.delete("/remove/:id", matchingRequestController.deleteMatchingRequest);




const matchRequestRoutes = (app) => {
    app.use('/api/match-request', router); 
  };

module.exports = matchRequestRoutes;
