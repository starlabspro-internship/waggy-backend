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
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    petID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Pets",
        key: "id",
      },
    },
    adoptionStatus: {
      type: DataTypes.ENUM("Available", "Unavailable", "Pending" , 'Adopted'),
      defaultValue: "Available",
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