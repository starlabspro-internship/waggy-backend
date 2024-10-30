const { Pet } = require('../models'); 

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
        const { species, name, age, description, gender, petPicture, score, interests, breed } = req.body;

        const newPet = await Pet.create({ 
            species,
            name,
            age,
            description,
            gender,
            petPicture,
            score,
            interests,
            breed
        });

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
        const pet = await Pet.findByPk(req.params.id); 

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found.' });
        }

        const updatedPet = await pet.update(req.body);
        res.status(200).json(updatedPet); 
    } catch (error) {
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
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the pet.' });
    }
};
