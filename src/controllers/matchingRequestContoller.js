const { MatchingRequest, User, Pet } = require("../models");
const { Op } = require("sequelize");

exports.createMatchingRequest = async (req, res) => {
  const senderUserId = req.userId; // Extract userId from the authenticated request

  try {
    const { senderPetId, receiverPetId } = req.body;

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



// Get all MatchingRequests for the current user (both sent and received)
exports.getAllMatchingRequests = async (req, res) => {
// Get all matching requests made by the user
  try {
    const userId = req.userId; // Assuming userId is provided from authenticated user

    // Fetch all matching requests related to the user
    const requests = await MatchingRequest.findAll({
      where: {
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

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching requests found for the user",
      });
    }

    // Prepare the response data for all requests
    const responseData = requests.map(request => ({
      id: request.id,
      status: request.status,
      senderPetId: request.senderPetId,
      senderPetName: request.senderPet?.name || "Unknown Pet",
      receiverPetName: request.receiverPet?.name || "Unknown Pet",
    }));

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching matching requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching matching requests",
    });
  }
};


// Get the matching request status and sender pet ID
exports.getMatchingRequestStatus = async (req, res) => {
  try {
    const { receiverPetId } = req.params;
    const userId = req.userId;

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


// Update MatchingRequest status (Accept/Decline)
exports.updateMatchingRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

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
