const { AdoptionRequest, User , Profile, Pet, AdoptionListing} = require('../models');
const generateAcceptRequestEmail = require('../template/generateAcceptRequestEmail');
const sendEmail = require("../services/emailService");


exports.createAdoptionRequest = async (req, res) => {
  const {  listingID, id, requestStatus} = req.body;
  const requestUserID = req.userId
  
  try {
    const adoptionListing = await AdoptionListing.findByPk(listingID)
    if (!adoptionListing) {
      return res.status(404).json({ message: 'Adoption listing not found.' });
    }
    const userID = adoptionListing.userID;
    if (!userID || !listingID ||  !requestUserID) {
      return res.status(400).json({
        message:
        'userID, listingID, requestStatus, and requestUserID are required.',
      });
    }
    const newAdoptionRequest = await AdoptionRequest.create({
      userID,
      listingID,
      requestStatus,
      requestUserID,
    });
    
    const adoptionRequestWithAssociations = await AdoptionRequest.findOne({
      where: {
        id: newAdoptionRequest.id,
        requestStatus: "pending",  // Ensure the status is pending
      },
      include: [
        { 
          model: User, 
          as: 'owner', 
          attributes: ['id', 'email'],
          include: [
            { 
              model: Profile,
              as: 'profile', 
              attributes: ['firstName', 'lastName'], 
            }, // Profile details for the owner
          ],
        },
        { 
          model: User, 
          as: 'requestingUser', 
          attributes: ['id', 'email'],
          include: [
            { 
              model: Profile,
              as: 'profile', 
              attributes: ['firstName', 'lastName'], 
            }, // Profile details for the requesting user
          ],
        },
        { 
          model: AdoptionListing, 
          as: 'listing', 
          attributes: ['id', 'adoptionStatus', 'petID'],
          include: [
            { 
              model: Pet, 
              as: 'pet', 
              attributes: ['name', 'species', 'breed', 'age'], // Include pet details
            },
          ],
        },
      ],
    });

    const ownerEmail = adoptionRequestWithAssociations?.owner?.email || "email"
    const requestingUserEmail = adoptionRequestWithAssociations?.requestingUser?.email || "email"
    const ownerName = adoptionRequestWithAssociations?.owner?.profile?.firstName || "firstName"
    const requesterName = adoptionRequestWithAssociations?.requestingUser?.profile?.firstName || "firstName"
    const petDetails = adoptionRequestWithAssociations?.listing?.pet?.name || "Pet"
    if (!ownerEmail) {
      throw new Error("Owner's email is missing");
    }


    // Send email to the owner if owner email is found
    const emailContent = generateAcceptRequestEmail( ownerName, requesterName, petDetails);
   
    if (!emailContent) {
      throw new Error("Email content is missing");
    }

    await sendEmail( ownerEmail, "New Adoption Request Received", emailContent,
    );
   
    
    res.status(201).json(adoptionRequestWithAssociations);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionRequests = async (req, res) => {
  
  try {
    const adoptionRequests = await AdoptionRequest.findAll({
      include: [
        { 
          model: User, 
          as: 'owner', 
          attributes: ['id', 'email'],
          include: [
            { 
              model: Profile,
              as: 'profile', 
              attributes: ['firstName', 'lastName'], 
            }, // Profile details for the owner
          ],
        },
        { 
          model: User, 
          as: 'requestingUser', 
          attributes: ['id', 'email'],
          include: [
            { 
              model: Profile,
              as: 'profile', 
              attributes: ['firstName', 'lastName'], 
            }, // Profile details for the requesting user
          ],
        },
        { 
          model: AdoptionListing, 
          as: 'listing', 
          attributes: ['id', 'adoptionStatus', 'petID'],
          include: [
            { 
              model: Pet, 
              as: 'pet', 
              attributes: ['name', 'species', 'breed', 'age' , 'petPicture'], // Include pet details
            },
          ],
        },
      ],
    });
    
    res.json(adoptionRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionRequest = await AdoptionRequest.findOne({
      where: { id },
      include: [
        { model: User, as: 'owner' },
        { model: AdoptionListing, as: 'listing' },
      ],
    });
 
    if (!adoptionRequest) {
      return res.status(404).json({ message: 'Adoption request not found.' });
    }
    res.json(adoptionRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdoptionRequest = async (req, res) => {
  const { id } = req.params;
  const { userID, listingID, requestStatus, requestUserID } = req.body;

  try {
    const adoptionRequest = await AdoptionRequest.findByPk(id);
    if (!adoptionRequest) {
      return res.status(404).json({ message: 'Adoption request not found.' });
    }

    // Update the adoption request
    adoptionRequest.userID = userID || adoptionRequest.userID;
    adoptionRequest.listingID = listingID || adoptionRequest.listingID;
    adoptionRequest.requestStatus =
      requestStatus || adoptionRequest.requestStatus;
    adoptionRequest.requestUserID =
      requestUserID || adoptionRequest.requestUserID;

    await adoptionRequest.save();
    res.json(adoptionRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdoptionRequest = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const adoptionRequest = await AdoptionRequest.findOne({ where: { id }});
    
    if (!adoptionRequest) {
      return res.status(404).json({ message: 'Adoption request not found.' });
    }
    
    // adoptionRequest.requestStatus = "removed"; // Update status
    // await adoptionRequest.save();
    await adoptionRequest.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




