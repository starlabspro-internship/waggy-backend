module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add single unique index
    await queryInterface.addIndex('users', {
      fields: ['email'],
      unique: true,
      name: 'unique_email'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('users', 'unique_email');
  }
};