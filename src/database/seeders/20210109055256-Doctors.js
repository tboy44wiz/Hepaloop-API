'use strict';

import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcryptjs'

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
    await queryInterface.bulkInsert('Doctors', [{
      id: uuidV4(),
      user_type: 'Doctor',
      doctors_name: 'John Doe',
      doctors_email: 'john_doe@gmail.com',
      doctors_phone: '08033407000',
      doctors_password: bcrypt.hashSync('password123', 10),
      doctors_specialty: 'Surgeon',
      doctors_address: '54 Masha Road Surulere Lagos.',
      doctors_city: 'Surulere',
      doctors_state: 'Lagos',
      doctors_country: 'Nigeria',
      doctors_hospital: 'Avon Clinic Masha',
      doctors_rating: '5',
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
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
