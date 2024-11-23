const { MatchingRequest, User, Pet, Profile } = require("../models");
const sendEmail = require("../services/emailService");
const generateAcceptFriendRequestEmail = require("../template/acceptFriendRequest");
const generateDeclineFriendRequestEmail = require("../template/declineFriendRequest");

console.log(generateAcceptFriendRequestEmail)
const { Op } = require("sequelize");

exports.createMatchingRequest = async (req, res) => {
  const senderUserId = req.userId; // Extract userId from the authenticated request

  try {
    const { senderPetId, receiverPetId } = req.body;


    console.log(senderPetId, receiverPetId)
 

    // Verify sender owns the pet
    const senderPet = await Pet.findOne({
      where: { id: senderPetId, userId: senderUserId },
    });

    if (!senderPet) {
      return res.status(403).json({
        success: false,
   
      });
    }

    // Get receiver's user ID from their pet
    const receiverPet = await Pet.findOne({
      where: { id: receiverPetId },
      attributes: ["userId"],
    });
    console.log(receiverPet, " ska pet other?")
    if (!receiverPet) {
      return res.status(404).json({
        success: false,
      });
    }

    // Check if a request already exists
    const existingRequest = await MatchingRequest.findOne({
      where: {
        [Op.or]: [
          {
            senderPetId,
            receiverPetId,
            status: { [Op.ne]: "Declined" },
          },
          {
            senderPetId: receiverPetId,
            receiverPetId: senderPetId,
            status: { [Op.ne]: "Declined" },
          },
        ],
      },
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
      });
    }

    const matchingRequest = await MatchingRequest.create({
      senderUserId,
      receiverUserId: receiverPet.userId,
      senderPetId,
      receiverPetId,

      status: "Pending",
    });

    res.status(201).json({
      success: true,
      data: matchingRequest,
    });
  } catch (error) {
    console.error("Error creating matching request:", error);
    res.status(500).json({
      success: false,
    });
  }
};

// 
exports.getAllMatchingRequestsOfTheSender = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is provided from authenticated user

    // Fetch all matching requests where the user is the sender and status is pending
    const requests = await MatchingRequest.findAll({
      where: {
        senderUserId: userId,
        status: 'Pending',
      },
      attributes: ['id', 'status', 'senderPetId', "receiverPetId"],
      include: [
        {
          model: Pet,
          as: 'senderPet', // Using the alias defined in the association
          attributes: ['name'], // Fetch only the 'name' attribute
        },
        {
          model: Pet,
          as: 'receiverPet', // Using the alias defined in the association for receiver pet
          attributes: ['name', ], // Fetch only the 'name' attribute
        },
        
      ],
    });
    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching requests found for the user",
      });
    }

    // Prepare the response data for all request

    res.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching matching requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching matching requests",
    });
  }
};

exports.getAllInvitationsForUser = async (req, res) => {
  try {
    const userId = req.userId;

    const invitations = await MatchingRequest.findAll({
      where: {
        receiverUserId: userId,
        status: 'Pending',
      },
      attributes: ['id', 'status', 'senderPetId', 'receiverPetId'],
      include: [
        {
          model: Pet,
          as: 'senderPet',
          attributes: ['name'],
        },
        {
          model: Pet,
          as: 'receiverPet',
          attributes: ['name'],
        },
      ],
    });

    res.json({
      success: true,
      data: invitations,
    });
  } catch (error) {
    console.error("Error fetching invitations for user:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching invitations for user",
    });
  }
};


// Get all MatchingRequests for the current user (both sent and received)
exports.getAllAcceptedRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const acceptedRequests = await MatchingRequest.findAll({
      where: {
        [Op.or]: [
          { senderUserId: userId },
          { receiverUserId: userId },
        ],
        status: 'Accepted',
      },
      attributes: ['id', 'status', 'senderPetId', 'receiverPetId'],
      include: [
        {
          model: Pet,
          as: 'senderPet',
          attributes: ['name'],
        },
        {
          model: Pet,
          as: 'receiverPet',
          attributes: ['name'],
        },
      ],
    });

    res.json({
      success: true,
      data: acceptedRequests,
    });
  } catch (error) {
    console.error("Error fetching accepted requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching accepted requests",
    });
  }
};



// Get the matching request status and sender pet ID
exports.getMatchingRequestStatus = async (req, res) => {
  console.log("ka initim")
  try {
    const { receiverPetId } = req.params;
    const userId = req.userId;
    console.log(receiverPetId, "ka iddddd")

    const request = await MatchingRequest.findOne({
      where: {
        receiverPetId,
        [Op.or]: [
          { senderUserId: userId },
          { receiverUserId: userId },
        ],
      },
      attributes: ['id', 'status', 'senderPetId'],
      include: [
        {
          model: Pet,
          as: 'senderPet', // Using the alias defined in the association
          attributes: ['name'], // Fetch only the 'name' attribute
        },
        {
          model: Pet,
          as: 'receiverPet', // Using the alias defined in the association for receiver pet
          attributes: ['name'], // Fetch only the 'name' attribute
        },
      ],
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Matching request not found",
      });
    }

    // Prepare the response data
    const responseData = {
      id: request.id,
      status: request.status,
      senderPetId: request.senderPetId,
      senderPetName: request.senderPet?.name || "Unknown Pet",
      receiverPetName: request.receiverPet?.name || "Unknown Pet",
    };

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching matching request status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching matching request status",
    });
  }
};



exports.getMatchingRequestStatusbyId = async (req, res) => {
  try {
    const { matchRequestId } = req.params; // Assuming primary key is matchId
    const userId = req.userId;

    console.log(matchRequestId);

    // Fetch the matching request by primary key (matchId)
    const request = await MatchingRequest.findOne({
      where: {
        id: matchRequestId, // Primary key
        [Op.or]: [
          { senderUserId: userId }, // Ensures the user is part of the request
          { receiverUserId: userId },
        ],
      },
      attributes: ['id', 'status', 'senderPetId'],
      include: [
        {
          model: Pet,
          as: 'senderPet', // Association alias
          attributes: ['name', 'species', 'age', 'gender', 'petPicture', 'breed', 'interests'],
        },
        {
          model: Pet,
          as: 'receiverPet', // Association alias
          attributes: ['name'],
        },
        {
          model: User,
          as: 'sender', // Association alias for sender user
          attributes: [ 'email'],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: [
                "firstName",
                "address",
                "profilePicture"
              ],
            },
          ],
        },

      ],
    });

    // Handle cases where the match request is not found
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Matching request not found",
      });
    }

    // Send the successful response
    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error fetching matching request status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching matching request status",
    });
  }
};





// Update MatchingRequest status (Accept/Decline)
exports.updateMatchingRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    if (!["Accepted", "Declined"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Accepted' or 'Declined'",
      });
    }

    const request = await MatchingRequest.findOne({
      where: {
        id,
        receiverUserId: userId,
        status: "Pending",
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['email'],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: ['firstName', "organisationName"],
            },
          ],
        },
        {
          model: User,
          as: 'receiver',
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: ['firstName', "organisationName"],
            },
          ],
        },
      ],
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Pending matching request not found",
      });
    }

    request.status = status;
    if (status === "Accepted") {
      request.matchedAt = new Date();
    }
    await request.save();
    const senderEmail = request.sender.email;
    const senderName = request.sender.profile.firstName || request.sender.profile.organisationName;
    const receiverName = request.receiver.profile.firstName || request.receiver.profile.firstName;

    // Send email notification if request is accepted
    if (status === "Accepted") {
      const emailContent = generateAcceptFriendRequestEmail(receiverName, senderName);
      await sendEmail(senderEmail, 'Your Match Request Was Accepted!', emailContent);
    } else if (status === "Declined") {
      const emailContent = generateDeclineFriendRequestEmail(receiverName, senderName);
      await sendEmail(senderEmail, 'Your Match Request Was Declined!', emailContent);
    }
    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error updating matching request:", error);
    res.status(500).json({
      success: false,
      message: "Error updating matching request",
    });
  }
};

// Delete a MatchingRequest
exports.deleteMatchingRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const request = await MatchingRequest.findOne({
      where: {
        id,
        senderUserId: userId,
        status: "Pending",
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Pending matching request not found or not authorized to delete",
      });
    }

    await request.destroy();

    res.json({
      success: true,
      message: "Matching request deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting matching request:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting matching request",
    });
  }
};
