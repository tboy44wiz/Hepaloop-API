'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pharmacy', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      pharmacy_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pharmacy_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pharmacy_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pharmacy_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pharmacy_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pharmacy_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pharmacy_state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pharmacy_country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pharmacy_DOR: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pharmacy_profileInfo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pharmacy_logo: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://cdn1.vectorstock.com/i/thumbs/57/05/abstract-logo-green-cross-pharmacy-vector-6235705.jpg',
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
    await queryInterface.dropTable('Pharmacy');
  }
};
