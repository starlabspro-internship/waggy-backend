const { AdoptionListing, User, Pet , Profile } = require('../models');

exports.createAdoptionListing = async (req, res) => {
  
  const { petId, adoptionStatus } = req.body;
        const userId = req.userId
  try {
    // Validate input data
    if (!petId || !userId || !adoptionStatus) {
  
      return res
        .status(400)
        .json({ message: 'petID, userID, and adoptionStatus are required.' });
    }

    const newAdoptionListing = await AdoptionListing.create({
      petID: petId ,
      userID: userId ,
      adoptionStatus: adoptionStatus,
      listedAt:  new Date(),
    });
    
    res.status(201).json(newAdoptionListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionListings = async (req, res) => {
    console.log('it is working');
    try {
      const adoptionListings = await AdoptionListing.findAll({
        include: [
          {
            model: User, as: 'user',
            include: [
              {
                model: Profile, as : 'profile' ,
                attributes: ['firstName', 'lastName', 'profilePicture', 'address']
              }
            ]
          },
          { model: Pet, as: 'pet' }
        ], // Include user and pet details
      });
   
    res.json(adoptionListings);
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionListingById = async (req, res) => {
  
  try {
    const { id } = req.params; // Get petId from request parameters
    const userId = req.userId; // Get userId from request parameters
    console.log(id);
    const adoptionListing = await AdoptionListing.findOne({
      where: { petID: id 
      },
      include: [
        {
          model: User, as: 'user',
          include: [
            {
              model: Profile, as : 'profile' ,
              attributes: ['firstName', 'lastName', 'profilePicture', 'address']
            }
          ]
        },
        { model: Pet, as: 'pet' }
      ], // Include user and pet details // Search by petId
});
    if (!adoptionListing) {
      
      return res.status(404).json({ message: 'Adoption listing not found.' });
    }
    
    res.json(adoptionListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdoptionListing = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { adoptionStatus } = req.body 
 
 
  try {
    const adoptionListing = await AdoptionListing.findOne({
      where: { petID: id },  // Assuming 'petID' is the correct column
    });
    console.log("adoption listing: " , adoptionListing.adoptionStatus);
    if (!adoptionListing) {
      return res.status(404).json({ message: 'Adoption listing not found.' });
    }

   
    if (adoptionStatus) {
      await adoptionListing.update({ adoptionStatus });
    };

    res.json(adoptionListing);
    console.log(" adoption status changed to: ",adoptionListing.adoptionStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdoptionListing = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionListing = await AdoptionListing.findByPk(id);
    if (!adoptionListing) {
      return res.status(404).json({ message: 'Adoption listing not found.' });
    }

    await adoptionListing.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};