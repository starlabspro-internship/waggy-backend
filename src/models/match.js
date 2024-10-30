'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.User, { foreignKey: 'user1Id', as: 'User1' });
      Match.belongsTo(models.User, { foreignKey: 'user2Id', as: 'User2' });
      Match.belongsTo(models.Pet, { foreignKey: 'pet1Id', as: 'Pet1' });
      Match.belongsTo(models.Pet, { foreignKey: 'pet2Id', as: 'Pet2' });
    }
  }

  Match.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matchesStatus: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Match',
    tableName: 'Matches',
    timestamps: true,
  });

  return Match;
};

