'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdoptionListing extends Model {
    static associate(models) {
      AdoptionListing.belongsTo(models.Pet, { foreignKey: 'petID', as: 'pet' });
      AdoptionListing.belongsTo(models.User, { foreignKey: 'userID', as: 'user' });
      AdoptionListing.hasMany(models.AdoptionRequest, { foreignKey: 'listingID', as: 'requests' });
    }
  }

  AdoptionListing.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    petID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adoptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'AdoptionListing',
  });

  return AdoptionListing;
};