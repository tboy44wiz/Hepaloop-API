'use strict';

import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Individuals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Individuals.init({
    individuals_name: DataTypes.STRING,
    individuals_email: DataTypes.STRING,
    individuals_phone: DataTypes.STRING,
    individuals_password: DataTypes.STRING,
    individuals_gender: DataTypes.ENUM('Select Gender', 'Male', 'Female'),
    individuals_DOB: DataTypes.STRING,
    individuals_age: DataTypes.INTEGER,
    individuals_address: DataTypes.STRING,
    individuals_city: DataTypes.STRING,
    individuals_state: DataTypes.STRING,
    individuals_country: DataTypes.STRING,
    individuals_height: DataTypes.STRING,
    individuals_weight: DataTypes.STRING,
    individuals_avatar: DataTypes.STRING,
    purpose_for_treatment: DataTypes.STRING,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Individuals',
    freezeTableName: true,
  });

  //  Before the Records will be created, let's d the following.
  Individuals.beforeCreate(async (individual) => {
    individual.id = await uuidV4();
  });
  Individuals.beforeCreate(async (individual) => {
    individual.individuals_password = await bcrypt.hashSync(individual.individuals_password, 10);
  });

  //  After the record is persisted and before the persisted data are returned, let's remove the "individuals_password".
  Individuals.afterCreate(async (individual) => {
    delete individual.dataValues.individuals_password;
  });

  return Individuals;
};
