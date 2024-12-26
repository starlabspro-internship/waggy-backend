const { Message, User, Profile } = require('../models');
const { Op } = require('sequelize');

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { content, receiverUserID, chatRoomId } = req.body;
    const senderUserID = req.userId; // Assumes authenticated user

    const message = await Message.create({
      senderUserID,
      receiverUserID,
      content,
      chatRoomId,
      isRead: false,
    });

    const messageWithUsers = await Message.findOne({
      where: { messagesId: message.messagesId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'email'],  // Included email, removed firstName and lastName
          include: {
            model: Profile, 
            as : "profile" ,           
            attributes: ['firstName' , 'lastName' ,'profilePicture']  // Keeping profilePicture
          }
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'email'],  // Included email, removed firstName and lastName
          include: {
            model: Profile, 
            as : "profile" ,      
            attributes: ['firstName' , 'lastName' ,'profilePicture']  // Keeping profilePicture
          }
        }
      ]
    });
    
    return res.status(201).json(messageWithUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get conversation between two users


const getConversation = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.userId; // Assuming req.userId comes from authentication middleware
    console.log(otherUserId);
    // Create chatRoomId as the sorted combination of senderUserID and receiverUserID
    const chatRoomId1 = [userId, otherUserId].sort().join('-');
    const chatRoomId2 = [otherUserId, userId].sort().join('-');
    console.log(chatRoomId1 , chatRoomId2);
    // Find messages with either of the chatRoomIds
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { chatRoomId: otherUserId },
          { chatRoomId: otherUserId },
        ],
      },
      raw: true,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'email'],
          include: {
            model: Profile,
            as: 'profile',
            attributes: ['firstName', 'lastName', 'profilePicture'],
          },
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'email'],
          include: {
            model: Profile,
            as: 'profile',
            attributes: ['firstName', 'lastName', 'profilePicture'],
          },
        },
      ],
      order: [['sentAt', 'ASC']], // Ensure messages are ordered by sentAt (ascending)
    });

    // Mark messages as read (for the current user) if they haven't been read
    await Message.update(
      { isRead: true },
      {
        where: {
          receiverUserID: userId,
          senderUserID: otherUserId,
          isRead: false,
        },
      }
    );

    console.log(`Messages from ${otherUserId} and ${userId} : ${messages}`);
    return res.status(200).json(messages); // Return the messages in the response
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return res.status(500).json({ error: error.message });
  }
};
// Get user's recent conversations
const getRecentConversations = async (req, res) => {
  try {
    const userId = req.userId; // Assumes authenticated user

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderUserID: userId },
          { receiverUserID: userId }
        ]
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username', 'email'],  // Included email, removed firstName and lastName
          include: {
            model: Profile,
            attributes: ['profilePicture']  // Keeping profilePicture
          }
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username', 'email'],  // Included email, removed firstName and lastName
          include: {
            model: Profile,
            attributes: ['profilePicture']  // Keeping profilePicture
          }
        }
      ],
      order: [['sentAt', 'DESC']],
      group: [
        [sequelize.fn('LEAST',
          sequelize.col('senderUserID'),
          sequelize.col('receiverUserID')),
         sequelize.fn('GREATEST',
          sequelize.col('senderUserID'),
          sequelize.col('receiverUserID'))]
      ]
    });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getConversation,
  getRecentConversations
};
