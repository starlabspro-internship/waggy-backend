const { Friends, User } = require('../models');
const { Op } = require('sequelize');

// Add a friend request
exports.addFriend = async (req, res) => {
  const { senderUserID, receiverUserID } = req.body;

  if (senderUserID === receiverUserID) {
    return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
  }
  
  try {
    const existingRequest = await Friends.findOne({
      where: {
        [Op.or]: [
          { senderUserID, receiverUserID },
          { senderUserID: receiverUserID, receiverUserID: senderUserID }
        ]
      }
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already exists.' });
    }

    const friendship = await Friends.create({ senderUserID, receiverUserID, areFriendsStatus: 'pending' });
    res.status(201).json(friendship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get accepted friends
exports.getAcceptedFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await Friends.findAll({
      where: {
        [Op.or]: [
          { senderUserID: userId, areFriendsStatus: 'accepted' },
          { receiverUserID: userId, areFriendsStatus: 'accepted' }
        ]
      },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ]
    });

    const friendsList = friends.map(friendship => {
      return friendship.senderUserID === userId ? friendship.receiver : friendship.sender;
    });

    res.json(friendsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update friendship status
exports.updateFriendshipStatus = async (req, res) => {
  const { id } = req.params;
  const { areFriendsStatus } = req.body;
  try {
    const [updated] = await Friends.update(
      { areFriendsStatus },
      { where: { id } }
    );

    if (updated) {
      const updatedFriendship = await Friends.findOne({ where: { id } });
      res.status(200).json(updatedFriendship);
    } else {
      res.status(404).json({ message: 'Friendship not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a friendship
exports.deleteFriendship = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Friends.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Friendship not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Get a specific friend
exports.getFriendshipDetails = async (req, res) => {
  const { id } = req.params; // Friendship ID
  try {
    const friendship = await Friends.findOne({
      where: { id },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ]
    });

    if (!friendship) {
      return res.status(404).json({ message: 'Friendship not found' });
    }

    res.json(friendship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};