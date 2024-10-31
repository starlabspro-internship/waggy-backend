const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,     // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,   // Database host (e.g., localhost)
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize; // Export the sequelize instance