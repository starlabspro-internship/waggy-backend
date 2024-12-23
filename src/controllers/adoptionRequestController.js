const { AdoptionRequest, User , Profile, Pet, AdoptionListing} = require('../models');
const generateAcceptRequestEmail = require('../template/generateAcceptRequestEmail');
const sendEmail = require("../services/emailService");
const generateAcceptAdoptionRequestEmail = require('../template/generateAcceptAdoptionRequestEmail')
const generateDeclineAdoptionRequestEmail = require('../template/generateDeclineAdoptionRequestEmail')

exports.createAdoptionRequest = async (req, res) => {
  const {  listingID, id, requestStatus} = req.body;
  const requestUserID = req.userId
  console.log(listingID , requestStatus , requestUserID);
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
              attributes: ['id' ,'name', 'species', 'breed', 'age' ], // Include pet details
            },
          ],
        },
      ],
    });
    console.log('new Adoption Request' , adoptionListing);
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
              attributes: ['id' , 'name', 'species', 'breed', 'age' , 'petPicture' , 'status'], // Include pet details
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
        { 
          model: User, 
          as: 'owner', 
          attributes: ['id', 'email'],
          include: [
            { 
              model: Profile,
              as: 'profile', 
              attributes: ['firstName', 'lastName' , 'profilePicture' , 'address'], 
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
              attributes: ['firstName', 'lastName' , 'address'], 
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
              attributes: ['id' ,'name', 'species', 'breed', 'age' , 'petPicture' , 'interests' , 'status'], // Include pet details
            },
          ],
        },
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
  const { requestStatus , listing , pet } = req.body;
    
    console.log( 'id' , id , requestStatus);
  try {
    const adoptionRequest = await AdoptionRequest.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['email'],
          include: [{ model: Profile, as: 'profile', attributes: ['firstName'] }],
        },
        {
          model: User,
          as: 'requestingUser',
          attributes: ['email'],
          include: [{ model: Profile, as: 'profile', attributes: ['firstName'] }],
        },
        {
          model: AdoptionListing,
          as: 'listing',
          attributes: ['id', 'adoptionStatus'],
          include: [
            { model: Pet, as: 'pet', attributes: [ 'id','name' , 'status'] }, // Include pet details
          ],
        },
      ],
    });
    console.log('adoption request' ,adoptionRequest);
    if (!adoptionRequest) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }

    if (pet && pet.status) {
      const petToUpdate = await Pet.findByPk(adoptionRequest.listing.pet.id);
      if (petToUpdate) {
        petToUpdate.status = pet.status; // Set pet status (adopted or available)
        await petToUpdate.save();
        console.log('Pet status updated:', petToUpdate.status);
      } else {
        console.error('Pet not found');
      }
    }

    if (listing && listing.adoptionStatus) {
      const listingToUpdate = await AdoptionListing.findByPk(adoptionRequest.listingID);
      console.log('listing to update' , listingToUpdate.adoptionStatus);
      if (listingToUpdate) {
        listingToUpdate.adoptionStatus = listing.adoptionStatus;
        console.log(listingToUpdate.adoptionListing , listing.adoptionListing);
        await listingToUpdate.save();
      }
    }
    adoptionRequest.requestStatus = requestStatus; // Update the request status
    await adoptionRequest.save();


    const ownerEmail = adoptionRequest?.owner?.email || "email"
    const requestingUserEmail = adoptionRequest?.requestingUser?.email || "email"
    const ownerName = adoptionRequest?.owner?.profile?.firstName || "firstName"
    const requesterName = adoptionRequest?.requestingUser?.profile?.firstName || "firstName"
    const petDetails = adoptionRequest?.listing?.pet?.name || "Pet"
    console.log(ownerEmail , requestingUserEmail , ownerName , requesterName , petDetails);
    if (requestStatus === 'accepted' && ownerEmail) {
      const emailContent = generateAcceptAdoptionRequestEmail(
        ownerName,
        requesterName,
        petDetails
      );
      await sendEmail(requestingUserEmail, 'Adoption Request Accepted', emailContent);
    } else if (requestStatus === 'rejected' && ownerEmail) {
      const emailContent = generateDeclineAdoptionRequestEmail(
        ownerName,
        requesterName,
        petDetails
      );
      await sendEmail(requestingUserEmail, 'Adoption Request Rejected', emailContent);
    }
    
    res.status(200).json({ message: `Request ${requestStatus}`, adoptionRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error });
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




