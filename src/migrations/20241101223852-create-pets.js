'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      species: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: true
      },
      petPicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      interests: {
        type: Sequelize.STRING,
        allowNull: true
      },
      breed: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {  // Note the camelCase to match your model
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Create ENUM type first if using PostgreSQL
    // If using MySQL, the ENUM is created as part of the column definition
    /*
    if (queryInterface.sequelize.options.dialect === 'postgres') {
      await queryInterface.sequelize.query(`
        CREATE TYPE "enum_Pets_gender" AS ENUM ('Male', 'Female', 'Other');
      `);
    }
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pets');
    
    // Drop ENUM type if using PostgreSQL
    /*
    if (queryInterface.sequelize.options.dialect === 'postgres') {
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_Pets_gender";
      `);
    }
    */
  }
};