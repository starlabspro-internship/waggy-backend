const { Pet } = require('../models'); 
const fs = require('fs');
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.findAll(); 
        res.status(200).json(pets); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving pets.' });
        console.error(error)
    }
};

exports.createPet = async (req, res) => {
    try {
        const { name, gender, species, breed, age, interests, userId } = req.body;
        const petPicture = req.file ? `/uploads/${req.file.filename}` : null; 

        const newPet = await Pet.create({ 
            name,
            gender,
            species,
            breed,
            age,
            interests,
            petPicture,
            userId: parseInt(userId),
        });
        console.log(`Created Pet ${newPet}`);

        res.status(201).json(newPet); 
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while creating the pet.' });
    }
};


exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }

        res.status(200).json(pet); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the pet.' });
    }
};


exports.updatePet = async (req, res) => {
    try {
      // Find the pet by ID
      const pet = await Pet.findByPk(req.params.id);
  
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found.' });
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
        updatedData.petPicture = `/uploads/${req.file.filename}` ; // Save the file path or URL as needed
      }
  
      // Update pet details
      const updatedPet = await pet.update(updatedData);
  
      // Return the updated pet
      res.status(200).json(updatedPet);
  
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while updating the pet.' });
    }
  };


exports.deletePet = async (req, res) => {
    try {
      const pet = await Pet.findByPk(req.params.id);
  
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found.' });
      }
  
      await pet.destroy(); 
      res.status(204).send("Pet was deleted successfully"); 
    } catch (error) {
      console.error('Error during deletion:', error); // Log the actual error
      res.status(500).json({ error: 'An error occurred while deleting the pet.' });
    }
  };