'use strict';

import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Patients.init({
    patients_name: DataTypes.STRING,
    patients_email: DataTypes.STRING,
    patients_phone: DataTypes.STRING,
    patients_password: DataTypes.STRING,
    patients_gender: DataTypes.ENUM('Male', 'Female'),
    patients_DOB: DataTypes.STRING,
    patients_age: DataTypes.INTEGER,
    patients_address: DataTypes.STRING,
    patients_city: DataTypes.STRING,
    patients_state: DataTypes.STRING,
    patients_country: DataTypes.STRING,
    patients_height: DataTypes.INTEGER,
    patients_weight: DataTypes.INTEGER,
    purpose_for_treatment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Patients',
    freezeTableName: true,
  });

  //  Before the Records will be created, let's d the following.
  Patients.beforeCreate(async (patient) => {
    patient.id = await uuidV4();
  });
  Patients.beforeCreate(async (patient) => {
    patient.patients_password = await bcrypt.hashSync(patient.patients_password, 10);
  });

  //  After the record is persisted and before the persisted data are returned, let's remove the "patients_password".
  Patients.afterCreate(async (patient) => {
    delete patient.dataValues.patients_password;
  });

  return Patients;
};
