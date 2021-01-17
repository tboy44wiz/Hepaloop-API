'use strict';

import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doctors.init({
    doctors_name: DataTypes.STRING,
    doctors_email: DataTypes.STRING,
    doctors_phone: DataTypes.STRING,
    doctors_password: DataTypes.STRING,
    doctors_gender: DataTypes.ENUM('Male', 'Female'),
    doctors_specialty: DataTypes.STRING,
    doctors_address: DataTypes.STRING,
    doctors_city: DataTypes.STRING,
    doctors_state: DataTypes.STRING,
    doctors_country: DataTypes.STRING,
    doctors_hospital: DataTypes.STRING,
    doctors_avatar: DataTypes.STRING,
    doctors_rating: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctors',
    freezeTableName: true,
  });

  //  Before the Records will be created, let's d the following.
  Doctors.beforeCreate(async (doctor) => {
    doctor.id = await uuidV4();
  });
  Doctors.beforeCreate(async (doctor) => {
    doctor.doctors_password = await bcrypt.hashSync(doctor.doctors_password, 10);
  });
  Doctors.beforeCreate(async (doctor) => {
    delete doctor.dataValues.doctors_confirmPassword;
  });

  //  After the record is persisted and before the persisted data are returned, let's remove the "doctors_password".
  Doctors.afterCreate(async (doctor) => {
    delete doctor.dataValues.doctors_password;
  });

  return Doctors;
};
