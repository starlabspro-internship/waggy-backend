'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MatchingRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      receiverUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      senderPetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      receiverPetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Declined'),
        defaultValue: 'Pending',
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      matchedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes to improve query performance
    await queryInterface.addIndex('MatchingRequests', ['senderUserId']);
    await queryInterface.addIndex('MatchingRequests', ['receiverUserId']);
    await queryInterface.addIndex('MatchingRequests', ['senderPetId']);
    await queryInterface.addIndex('MatchingRequests', ['receiverPetId']);
    await queryInterface.addIndex('MatchingRequests', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove indexes first
    await queryInterface.removeIndex('MatchingRequests', ['senderUserId']);
    await queryInterface.removeIndex('MatchingRequests', ['receiverUserId']);
    await queryInterface.removeIndex('MatchingRequests', ['senderPetId']);
    await queryInterface.removeIndex('MatchingRequests', ['receiverPetId']);
    await queryInterface.removeIndex('MatchingRequests', ['status']);

    // Drop the ENUM type after dropping the table
    await queryInterface.dropTable('MatchingRequests');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_MatchingRequests_status";');
  }
};