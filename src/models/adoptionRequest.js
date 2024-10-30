'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdoptionRequest extends Model {
    static associate(models) {
      // Each adoption request is associated with a user and a listing
      AdoptionRequest.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user',
      });
      AdoptionRequest.belongsTo(models.AdoptionListing, {
        foreignKey: 'listingID',
        as: 'listing',
      });
    }
  }

  AdoptionRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // References the Users model
          key: 'id',
        },
      },
      listingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'AdoptionListing', // References the Listings model
          key: 'id',
        },
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
        // references: {
        //   model: 'Users', // References the Users model for the user making the request
        //   key: 'id',
        // },
      },
    },
    {
      sequelize,
      modelName: 'AdoptionRequest',
    }
  );

  return AdoptionRequest;
};
