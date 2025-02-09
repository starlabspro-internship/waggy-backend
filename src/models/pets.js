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
      type: DataTypes.TEXT,
    },
    breed: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('available', 'adopted', 'pending'),
      defaultValue: 'available',
      allowNull: false,
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
    Pet.hasMany(models.MatchingListing, {
      foreignKey: "petId",
      as: "matchingListings",
      onDelete: "CASCADE", // Add this line
    });
    Pet.hasMany(models.MatchingRequest, {
      foreignKey: "senderPetId",
      as: "sentMatchRequests",
    });
    
    
    Pet.hasMany(models.MatchingRequest, {
      foreignKey: "receiverPetId",
      as: "receivedMatchRequests",
    });
    
  
    
  };

  return Pet;
};
