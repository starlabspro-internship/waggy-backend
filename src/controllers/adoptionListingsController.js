const { AdoptionListing, User, Pet } = require('../models');

exports.createAdoptionListing = async (req, res) => {
  const { petID, userID, adoptionStatus, listedAt } = req.body;
  try {
    // Validate input data
    if (!petID || !userID || !adoptionStatus) {
      return res
        .status(400)
        .json({ message: 'petID, userID, and adoptionStatus are required.' });
    }

    const newAdoptionListing = await AdoptionListing.create({
      petID,
      userID,
      adoptionStatus,
      listedAt: listedAt || new Date(),
    });
    res.status(201).json(newAdoptionListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionListings = async (req, res) => {
  try {
    const adoptionListings = await AdoptionListing.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Pet, as: 'pet' },
      ], // Include user and pet details
    });
    res.json(adoptionListings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionListing = await AdoptionListing.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Pet, as: 'pet' },
      ],
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
  const { petID, userID, adoptionStatus, listedAt } = req.body;

  try {
    const adoptionListing = await AdoptionListing.findByPk(id);
    if (!adoptionListing) {
      return res.status(404).json({ message: 'Adoption listing not found.' });
    }

    // Update the adoption listing entry
    adoptionListing.petID = petID || adoptionListing.petID;
    adoptionListing.userID = userID || adoptionListing.userID;
    adoptionListing.adoptionStatus =
      adoptionStatus || adoptionListing.adoptionStatus;
    adoptionListing.listedAt = listedAt || adoptionListing.listedAt;

    await adoptionListing.save();
    res.json(adoptionListing);
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
