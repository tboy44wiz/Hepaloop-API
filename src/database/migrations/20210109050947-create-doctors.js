'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      doctors_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      doctors_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      doctors_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      doctors_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      doctors_gender: {
        allowNull: false,
        type: Sequelize.ENUM('Male', 'Female')
      },
      doctors_specialty: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_hospital: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_SYOP: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_bioInfo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doctors_avatar: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png'
      },
      doctors_rating: {
        allowNull: true,
        type: Sequelize.ENUM('0', '1', '2', '3', '4', '5'),
        defaultValue: '0'
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
    await queryInterface.dropTable('Doctors');
  }
};
