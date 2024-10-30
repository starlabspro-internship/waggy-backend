'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // A blog belongs to a user
      Blog.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'author', // This alias can be used when including associated user data
      });
    }
  }

  Blog.init({
    blogId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    articleImage: {
      type: DataTypes.STRING,
      allowNull: true, // Assuming the image is optional
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set default to current date
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the referenced table
        key: 'id',      // Key in the referenced table
      },
    },
  }, {
    sequelize,
    modelName: 'Blog',
    timestamps: true ,
  });

  return Blog;
};