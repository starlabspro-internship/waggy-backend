"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class MatchingRequest extends Model {
    static associate(models) {
      // The user who sent the matching request
      MatchingRequest.belongsTo(models.User, {
        foreignKey: "senderUserId",
        as: "sender"
      });

      // The user who receives the matching request
      MatchingRequest.belongsTo(models.User, {
        foreignKey: "receiverUserId",
        as: "receiver"
      });

      // The pet that initiated the match request
      MatchingRequest.belongsTo(models.Pet, {
        foreignKey: "senderPetId",
        as: "senderPet"
      });

      // The pet being requested to match with
      MatchingRequest.belongsTo(models.Pet, {
        foreignKey: "receiverPetId",
        as: "receiverPet"
      });
    }
  }

  MatchingRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      senderUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      receiverUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      senderPetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pets",
          key: "id",
        },
      },
      receiverPetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pets",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("Pending", "Accepted", "Declined"),
        defaultValue: "Pending",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      matchedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "MatchingRequest",
      tableName: "MatchingRequests",
      timestamps: true, // Adds createdAt and updatedAt
    }
  );

  return MatchingRequest;
};