'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
      Rating.belongsTo(models.User, { foreignKey: 'receiverId', as: 'Receiver' });
      Rating.belongsTo(models.Pet, { foreignKey: 'petId' });
    }
  }

  Rating.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderFeedback: {
      type: DataTypes.TEXT,
    },
    receiverFeedback: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'Ratings',
    timestamps: true,
  });

  return Rating;
};
