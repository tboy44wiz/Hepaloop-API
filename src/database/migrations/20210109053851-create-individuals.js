'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Individuals', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      individuals_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      individuals_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      individuals_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      individuals_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      individuals_gender: {
        allowNull: false,
        type: Sequelize.ENUM('Select Gender', 'Male', 'Female'),
        defaultValue: 'Select Gender'
      },
      individuals_DOB: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_age: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      individuals_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_height: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_weight: {
        allowNull: true,
        type: Sequelize.STRING
      },
      individuals_avatar: {
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
    await queryInterface.dropTable('Individuals');
  }
};
