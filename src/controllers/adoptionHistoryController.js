const { AdoptionHistory, User, Pet } = require('../models');

exports.createAdoptionHistory = async (req, res) => {
  const { petID, userID, adoptionDate } = req.body;
  try {
    // Validate input data
    if (!petID || !userID || !adoptionDate) {
      return res
        .status(400)
        .json({ message: 'petID, userID, and adoptionDate are required.' });
    }

    const newAdoptionHistory = await AdoptionHistory.create({
      petID,
      userID,
      adoptionDate,
    });
    res.status(201).json(newAdoptionHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionHistories = async (req, res) => {
  try {
    const adoptionHistories = await AdoptionHistory.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Pet, as: 'pet' },
      ], // Include user and pet details
    });
    res.json(adoptionHistories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionHistory = await AdoptionHistory.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Pet, as: 'pet' },
      ],
    });

    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found.' });
    }
    res.json(adoptionHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdoptionHistory = async (req, res) => {
  const { id } = req.params;
  const { petID, userID, adoptionDate } = req.body;

  try {
    const adoptionHistory = await AdoptionHistory.findByPk(id);
    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found.' });
    }

    // Update the adoption history entry
    adoptionHistory.petID = petID || adoptionHistory.petID;
    adoptionHistory.userID = userID || adoptionHistory.userID;
    adoptionHistory.adoptionDate = adoptionDate || adoptionHistory.adoptionDate;

    await adoptionHistory.save();
    res.json(adoptionHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdoptionHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionHistory = await AdoptionHistory.findByPk(id);
    if (!adoptionHistory) {
      return res.status(404).json({ message: 'Adoption history not found.' });
    }

    await adoptionHistory.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
