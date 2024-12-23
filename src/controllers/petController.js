const { Pet, MatchingListing ,MatchingRequest , AdoptionListing , AdoptionRequest} = require('../models'); 



// Assuming you have middleware to authenticate the user and attach the userId to the request object
exports.getAllPets = async (req, res) => {
  const userId = req.userId; // Get the authenticated user's ID

  try {
      // Find all pets associated with the authenticated user
      const pets = await Pet.findAll({ where: { userId: userId } }); 

      if (!pets || pets.length === 0) {
          return res.status(404).json({ message: 'No pets found for this user.' });
      }

      // Return the pets associated with the authenticated user
      res.status(200).json(pets); 
  } catch (error) {
      console.error('Error fetching pets:', error);
      res.status(500).json({ error: 'An error occurred while retrieving pets.' });
  }
};

exports.createPet = async (req, res) => {
  const userId = req.userId; // User ID from the authenticated token

  try {
    // Prepare data for pet creation
    const petData = {
      name: req.body.name,
      gender: req.body.gender,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      interests: req.body.interests,
      userId: userId, // Use the authenticated user ID
    };

    // If a new picture is uploaded, add it to the pet data
    if (req.file) {
      petData.petPicture = `/uploads/${req.file.filename}`; // Save the file path or URL as needed
    }

    // Create new pet record
    const newPet = await Pet.create(petData);

    // Fetch the newly created pet and return it
    const createdPet = await Pet.findOne({
      where: {
        id: newPet.id,
        userId: userId,
      },
    });

    res.status(201).json(createdPet); // Return the created pet
  } catch (error) {
    console.error('Error during pet creation:', error);
    res.status(500).json({ error: 'An error occurred while creating the pet.' });
  }
};


exports.getPetById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Get userId from the auth middleware

  try {
      const pet = await Pet.findOne({
          where: {
              id: id,
              userId: userId, // Ensure the pet belongs to the authenticated user
          },
      });

      if (!pet) {
          return res.status(404).json({ error: 'Pet not found for this user.' });
      }

      res.status(200).json(pet);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the pet.' });
  }
};


exports.updatePet = async (req, res) => {
  const { id } = req.params; // Pet ID from the URL
  const userId = req.userId; // User ID from the authenticated token

  try {
    // Find the pet that belongs to the authenticated user
    const pet = await Pet.findOne({
      where: {
        id: id,
        userId: userId, // Ensure the pet belongs to this user
      },
    });

    // If pet is not found, return 404
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found for this user.' });
    }

    // Prepare data for update
    const updatedData = {
      name: req.body.name,
      gender: req.body.gender,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      interests: req.body.interests,
    };

    // If a new picture is uploaded, add it to the updated data
    if (req.file) {
      updatedData.petPicture = `/uploads/${req.file.filename}`; // Save the file path or URL as needed
    }

    // Update pet details
    await pet.update(updatedData);

    // Fetch the updated pet and return it
    const updatedPet = await Pet.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    res.status(200).json(updatedPet);
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ error: 'An error occurred while updating the pet.' });
  }
};


exports.deletePet = async (req, res) => {
  const { id } = req.params; // Pet ID to delete
  const userId = req.userId; // ID of the user making the request

  try {
    // Find the pet that belongs to the user
    const pet = await Pet.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found for this user." });
    }

    // Delete related matching requests where the pet is the sender
    await MatchingRequest.destroy({
      where: {
        senderPetId: id,
      },
    });

    // Delete related matching requests where the pet is the receiver
    await MatchingRequest.destroy({
      where: {
        receiverPetId: id,
      },
    });

    // Delete related matching listings
    await MatchingListing.destroy({
      where: {
        petId: id,
      },
    });
    await AdoptionListing.destroy({
      where: {
        petID: id,
      },
    });
    await AdoptionRequest.destroy({
      where: {
        listingID: id,
      },
    });

    // Finally, delete the pet
    await pet.destroy();

    res.status(200).json({ message: "Pet and related data deleted successfully." });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ error: "An error occurred while deleting the pet." });
  }
};

  