const { Friends, User } = require('../models');

exports.addFriend = async (req, res) => {
  const { senderUserID, receiverUserID } = req.body;
  try {
    const friendship = await Friends.create({ senderUserID, receiverUserID, areFriendsStatus: 'pending' });
    res.status(201).json(friendship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await Friends.findAll({
      where: {
        [Op.or]: [
          { senderUserID: userId },
          { receiverUserID: userId }
        ]
      },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ]
    });
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};