'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // A message belongs to a sender and a receiver
      Message.belongsTo(models.User, {
        foreignKey: 'senderUserID',
        as: 'sender', // Alias for the sender
      });
      Message.belongsTo(models.User, {
        foreignKey: 'receiverUserID',
        as: 'receiver', // Alias for the receiver
      });
    }
  }

  Message.init({
    messagesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming chatRoomId can be optional
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to false (not read)
    },
    senderUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    receiverUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: true;
  });

  return Message;
};