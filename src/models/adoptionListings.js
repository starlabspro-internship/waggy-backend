'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdoptionListing extends Model {
    static associate(models) {
      // Each adoption listing is associated with a pet and a user
      AdoptionListing.belongsTo(models.Pet, { foreignKey: 'petID', as: 'pet' });
      AdoptionListing.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user',
      });
    }
  }

  AdoptionListing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      petID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets', // References the Pets model
          key: 'id',
        },
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // References the Users model
          key: 'id',
        },
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
    },
    {
      sequelize,
      modelName: 'AdoptionListing',
    }
  );

  return AdoptionListing;
};
