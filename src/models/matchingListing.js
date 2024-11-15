"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class MatchingListing extends Model {
    static associate(models) {
      // An Matching listing belongs to a user (owner)
      MatchingListing.belongsTo(models.User, {
        foreignKey: "userId",
        as: "owner",
      });

      // An Matching listing is associated with a pet
      MatchingListing.belongsTo(models.Pet, {
        foreignKey: "petId",
        as: "pet",
      });
    }
  }

  MatchingListing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pets",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("Available", "Unavailable", "Pending"),
        defaultValue: "Available",
      },
    },
    {
      sequelize,
      modelName: "MatchingListing",
      tableName: "MatchingListings",
      timestamps: true,
    }
  );

  return MatchingListing;
};
