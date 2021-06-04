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
    await queryInterface.bulkInsert('Doctors', [
      {
        id: uuidV4(),
        user_type: 'Doctor',
        doctors_name: 'Jane Doe',
        doctors_email: 'j_doe@gmail.com',
        doctors_phone: '08033407000',
        doctors_password: bcrypt.hashSync('password123', 10),
        doctors_gender: 'Female',
        doctors_specialty: 'Surgeon',
        doctors_address: '54 Masha Road Surulere Lagos.',
        doctors_city: 'Surulere',
        doctors_state: 'Lagos',
        doctors_country: 'Nigeria',
        doctors_hospital: 'Avon Clinic Masha',
        doctors_rating: '5',
        doctors_avatar: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        user_type: 'Doctor',
        doctors_name: 'James Bennet',
        doctors_email: 'j_bennet@gmail.com',
        doctors_phone: '08033407000',
        doctors_password: bcrypt.hashSync('password123', 10),
        doctors_gender: 'Male',
        doctors_specialty: 'Surgeon',
        doctors_address: '54 Masha Road Surulere Lagos.',
        doctors_city: 'Surulere',
        doctors_state: 'Lagos',
        doctors_country: 'Nigeria',
        doctors_hospital: 'Avon Clinic Masha',
        doctors_rating: '5',
        doctors_avatar: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        user_type: 'Doctor',
        doctors_name: 'Iloh Hope',
        doctors_email: 'I_hope@gmail.com',
        doctors_phone: '08033407000',
        doctors_password: bcrypt.hashSync('password123', 10),
        doctors_gender: 'Female',
        doctors_specialty: 'Surgeon',
        doctors_address: '54 Masha Road Surulere Lagos.',
        doctors_city: 'Surulere',
        doctors_state: 'Lagos',
        doctors_country: 'Nigeria',
        doctors_hospital: 'Avon Clinic Masha',
        doctors_rating: '5',
        doctors_avatar: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        user_type: 'Doctor',
        doctors_name: 'Ozor Emeka',
        doctors_email: 'o_emeka@gmail.com',
        doctors_phone: '08033407000',
        doctors_password: bcrypt.hashSync('password123', 10),
        doctors_gender: 'Male',
        doctors_specialty: 'Cardiologist',
        doctors_address: 'No 4 Ebony Paint Awkunanaw, Enugu.',
        doctors_city: 'Udi',
        doctors_state: 'Enugu',
        doctors_country: 'Nigeria',
        doctors_hospital: 'Avon Clinic Masha',
        doctors_rating: '5',
        doctors_avatar: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        user_type: 'Doctor',
        doctors_name: 'Philip Mensa',
        doctors_email: 'p_mensa@gmail.com',
        doctors_phone: '08033407000',
        doctors_password: bcrypt.hashSync('password123', 10),
        doctors_gender: 'Male',
        doctors_specialty: 'Surgeon',
        doctors_address: '54 Masha Road Surulere Lagos.',
        doctors_city: 'Surulere',
        doctors_state: 'Lagos',
        doctors_country: 'Nigeria',
        doctors_hospital: 'Avon Clinic Masha',
        doctors_rating: '5',
        doctors_avatar: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
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
