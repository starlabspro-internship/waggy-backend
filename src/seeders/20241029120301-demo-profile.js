'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Profiles', [{
      firstName: "Shiro",
      lastName: "Tame",
      profilePicture: "Profile Image",
      address: "Tirana",
      organisationName: "StarLabs",
      phoneNumber: "0694490932",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   }], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Profiles', null, {});
   
  }
};
