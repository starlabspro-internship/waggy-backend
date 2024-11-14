'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Pet = sequelize.define('Pet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    species: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
    },
    petPicture: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    interests: {
      type: DataTypes.STRING,
    },
    breed: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Pets',
    timestamps: true,
  });

  Pet.associate = (models) => {
    Pet.belongsTo(models.User, {
      foreignKey: 'userId', 
      as: 'owner',         
    });

   // Pet.hasMany(models.AdoptionListing, {
   //   foreignKey: 'petId',
   //   as: 'adoptionListings', 
   // });

    Pet.hasMany(models.Rating, {
      foreignKey: 'petId',
      as: 'ratings',
    });

    Pet.belongsToMany(models.Pet, {
      through: models.Match, 
      as: 'matchedPets',      
      foreignKey: 'pet1Id',   
      otherKey: 'pet2Id',     
    });
  };

  return Pet;
};
