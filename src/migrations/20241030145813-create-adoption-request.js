'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdoptionRequests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // This references the 'Users' table
          key: 'id',
        },
      },
      listingID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'AdoptionListings', // This references the 'AdoptionListings' table
          key: 'id',
        },
      },
      requestStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requestedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      requestUserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // You can uncomment this block if you want to reference the Users model again.
        // references: {
        //   model: 'Users', // References the Users model for the user making the request
        //   key: 'id',
        // },
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
    await queryInterface.dropTable('AdoptionRequests');
  },
};