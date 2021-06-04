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
      hospitals_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hospitals_address: {
        allowNull: true,
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
      hospitals_DOR: {
        allowNull: true,
        type: Sequelize.STRING
      },
      hospitals_profileInfo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      hospitals_logo: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://www.eatlogos.com/health_logos/png/logo_for_hospitel_plus_design.png',
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
    await queryInterface.dropTable('Hospitals');
  }
};
