'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'refreshToken', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'refreshToken');
  }
};

