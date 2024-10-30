const { Message, User } = require('../models');

exports.sendMessage = async (req, res) => {
  const { content, chatRoomId, senderUserID, receiverUserID } = req.body;
  try {
    const newMessage = await Message.create({ content, chatRoomId, senderUserID, receiverUserID });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  const { chatRoomId } = req.params;
  try {
    const messages = await Message.findAll({
      where: { chatRoomId },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' },
      ],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};