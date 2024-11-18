'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('Users');
    
    if (!tableDefinition.resetPasswordToken) {
      await queryInterface.addColumn('Users', 'resetPasswordToken', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    
    if (!tableDefinition.resetPasswordExpires) {
      await queryInterface.addColumn('Users', 'resetPasswordExpires', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'resetPasswordToken');
    await queryInterface.removeColumn('Users', 'resetPasswordExpires');
  }
};