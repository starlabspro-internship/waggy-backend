'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdoptionHistory extends Model {
    static associate(models) {
      // Each adoption history entry is associated with a user and a pet
      AdoptionHistory.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user',
      });
      AdoptionHistory.belongsTo(models.Pet, { foreignKey: 'petID', as: 'pet' });
    }
  }

  AdoptionHistory.init(
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
      adoptionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'AdoptionHistory',
    }
  );

  return AdoptionHistory;
};
