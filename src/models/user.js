"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "userId", as: "profile" });

      User.hasMany(models.Blog, {
        foreignKey: "userID", // The foreign key in the Blog model
        as: "blogs", // Alias for the associated blogs
      });

      User.hasMany(models.Friends, {
        foreignKey: "senderUserID", // The foreign key in the Friends model for sent requests
        as: "sentRequests", // Alias for sent friend requests
      });

      User.hasMany(models.Friends, {
        foreignKey: "receiverUserID", // The foreign key in the Friends model for received requests
        as: "receivedRequests", // Alias for received friend requests
      });
      User.hasMany(models.Message, {
        foreignKey: "senderUserID",
        as: "sentMessages", // Alias for sent messages
      });

      // A user can receive many messages
      User.hasMany(models.Message, {
        foreignKey: "receiverUserID",
        as: "receivedMessages", // Alias for received messages
      });

      User.hasMany(models.MatchingListing, {
        foreignKey: "userId",
        as: "matchingListings",
      });
      User.hasMany(models.MatchingRequest, {
        foreignKey: "senderUserId",
        as: "sentMatchRequests",
      });
      
      User.hasMany(models.MatchingRequest, {
        foreignKey: "receiverUserId",
        as: "receivedMatchRequests",
      });
      
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
        },
      },
      resetPassword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );
  return User;
};
