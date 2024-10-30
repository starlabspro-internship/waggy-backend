'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MatchHistory extends Model {
    static associate(models) {
      // Each match history entry is associated with a pet and a user
      MatchHistory.belongsTo(models.Pet, { foreignKey: 'petID', as: 'pet' });
      MatchHistory.belongsTo(models.User, { foreignKey: 'userID', as: 'user' });
    }
  }

  MatchHistory.init(
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
      matchDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MatchHistory',
    }
  );

  return MatchHistory;
};
