'use strict';

import {v4 as uuidV4} from "uuid";
import bcrypt from "bcryptjs";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Pharmacy', [{
      id: uuidV4(),
      pharmacy_name: 'Avon Pharmacy',
      pharmacy_email: 'avon_pharmacy@gmail.com',
      pharmacy_phone: '08033407000',
      pharmacy_password: bcrypt.hashSync('password123', 10),
      pharmacy_address: '54 James Robertson street, Mashs Surulere, Lagos, Nigeria.',
      pharmacy_city: 'Surulere',
      pharmacy_state: 'Lagos',
      pharmacy_country: 'Nigeria',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pharmacy', null, {});
  }
};
