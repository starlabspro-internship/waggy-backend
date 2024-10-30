'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdoptionListings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      petID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets', // This references the 'Pets' table
          key: 'id',
        },
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // This references the 'Users' table
          key: 'id',
        },
      },
      adoptionStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'AdoptionRequests', // This references the 'AdoptionRequests' table
          key: 'id',
        },
      },
      listedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AdoptionListings');
  },
};
