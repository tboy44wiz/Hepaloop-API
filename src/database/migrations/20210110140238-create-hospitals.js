'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID4
      },
      hospitals_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hospitals_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hospitals_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hospitals_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hospitals_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      hospitals_state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      hospitals_country: {
        allowNull: true,
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
    await queryInterface.dropTable('Hospitals');
  }
};