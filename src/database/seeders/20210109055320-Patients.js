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
    await queryInterface.bulkInsert('Patients', [{
      id: uuidV4(),
      patients_name: 'John Doe',
      patients_email: 'john_doe@gmail.com',
      patients_phone: '08033407000',
      patients_password: bcrypt.hashSync('password123', 10),
      patients_gender: 'Male',
      patients_DOB: '1990-01-10T12:29:13.202Z',
      patients_age: 31,
      patients_address: '54 Masha Road Surulere Lagos.',
      patients_city: 'Surulere',
      patients_state: 'Lagos',
      patients_country: 'Nigeria',
      patients_height: 180,
      patients_weight: 72,
      purpose_for_treatment: 'Blood Pressure',
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
    await queryInterface.bulkDelete('Patients', null, {});
  }
};
