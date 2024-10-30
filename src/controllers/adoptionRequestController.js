const { AdoptionRequest, User, Listing } = require('../models');

exports.createAdoptionRequest = async (req, res) => {
  const { userID, listingID, requestStatus, requestUserID } = req.body;
  try {
    if (!userID || !listingID || !requestStatus || !requestUserID) {
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
    res.status(201).json(newAdoptionRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdoptionRequests = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Listing, as: 'listing' },
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
        { model: User, as: 'user' },
        { model: Listing, as: 'listing' },
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
  try {
    const adoptionRequest = await AdoptionRequest.findByPk(id);
    if (!adoptionRequest) {
      return res.status(404).json({ message: 'Adoption request not found.' });
    }

    await adoptionRequest.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
