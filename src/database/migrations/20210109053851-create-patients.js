'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      patients_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      patients_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      patients_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      patients_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      patients_gender: {
        allowNull: false,
        type: Sequelize.ENUM('Select Gender', 'Male', 'Female'),
        defaultValue: 'Select Gender'
      },
      patients_DOB: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_age: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      patients_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_height: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_weight: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patients_avatar: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://www.clipartmax.com/png/middle/27-271750_pix-for-woman-face-clipart-woman-images-clip-art.png',
      },
      purpose_for_treatment: {
        allowNull: true,
        type: Sequelize.ENUM('Blood Pressure', 'Blood Sugar', 'Antenatal')
      },
      user_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Patients');
  }
};
