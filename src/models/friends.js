'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    static associate(models) {
      // Each Friend entry has two users: sender and receiver
      Friends.belongsTo(models.User, { foreignKey: 'senderUserID', as: 'sender' });
      Friends.belongsTo(models.User, { foreignKey: 'receiverUserID', as: 'receiver' });
    }
  }

  Friends.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderUserID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
    },
    receiverUserID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    areFriendsStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Friends',
  });

  return Friends;
};