'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdoptionRequest extends Model {
    static associate(models) {
      AdoptionRequest.belongsTo(models.User, { foreignKey: 'userID', as: 'owner' });
      AdoptionRequest.belongsTo(models.AdoptionListing, { foreignKey: 'listingID', as: 'listing' });
      AdoptionRequest.belongsTo(models.User, { foreignKey: 'requestUserID', as: 'requestingUser' });
    }
  }

  AdoptionRequest.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    listingID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requestStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    requestUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AdoptionRequest',
  });

  return AdoptionRequest;
};