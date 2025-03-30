'use strict';
const { Op }=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('airplanes',[{
      modelNumber:'airbus12',
      capacity:230,
      createdAt:new Date(),
      updatedAt:new Date()
    },
  {
    modelNumber:'telli123',
    capacity:657,
    createdAt:new Date(),
    updatedAt:new Date()
  }
])
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('airplanes',{[Op.or]:[{modelNumber:'airbus12'},{modelNumber:'telli123'}]})
  }
};
