const { MatchHistory, Pet, User } = require('../models');

exports.createMatchHistory = async (req, res) => {
  const { petID, userID, matchDate } = req.body;
  try {
    if (!petID || !userID || !matchDate) {
      return res.status(400).json({
        message: 'petID, userID, and matchDate are required.',
      });
    }

    const newMatchHistory = await MatchHistory.create({
      petID,
      userID,
      matchDate,
    });
    res.status(201).json(newMatchHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchHistories = async (req, res) => {
  try {
    const matchHistories = await MatchHistory.findAll({
      include: [
        { model: Pet, as: 'pet' },
        { model: User, as: 'user' },
      ],
    });
    res.json(matchHistories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const matchHistory = await MatchHistory.findOne({
      where: { id },
      include: [
        { model: Pet, as: 'pet' },
        { model: User, as: 'user' },
      ],
    });

    if (!matchHistory) {
      return res.status(404).json({ message: 'Match history not found.' });
    }
    res.json(matchHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMatchHistory = async (req, res) => {
  const { id } = req.params;
  const { petID, userID, matchDate } = req.body;

  try {
    const matchHistory = await MatchHistory.findByPk(id);
    if (!matchHistory) {
      return res.status(404).json({ message: 'Match history not found.' });
    }

    // Update match history entry
    matchHistory.petID = petID || matchHistory.petID;
    matchHistory.userID = userID || matchHistory.userID;
    matchHistory.matchDate = matchDate || matchHistory.matchDate;

    await matchHistory.save();
    res.json(matchHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMatchHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const matchHistory = await MatchHistory.findByPk(id);
    if (!matchHistory) {
      return res.status(404).json({ message: 'Match history not found.' });
    }

    await matchHistory.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
