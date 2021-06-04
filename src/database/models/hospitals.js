'use strict';

import { v4 as uuidV4} from "uuid";
import bcrypt from "bcryptjs";
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Hospitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Hospitals.init({
    hospitals_name: DataTypes.STRING,
    hospitals_email: DataTypes.STRING,
    hospitals_phone: DataTypes.STRING,
    hospitals_password: DataTypes.STRING,
    hospitals_address: DataTypes.STRING,
    hospitals_city: DataTypes.STRING,
    hospitals_state: DataTypes.STRING,
    hospitals_country: DataTypes.STRING,
    hospitals_DOR: DataTypes.STRING,
    hospitals_profileInfo: DataTypes.STRING,
    hospitals_logo: DataTypes.STRING,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hospitals',
    freezeTableName: true
  });

  //  Before the Records will be created, let's d the following.
  Hospitals.beforeCreate(async (hospital) => {
    hospital.id = await uuidV4();
  });

  Hospitals.beforeCreate(async (hospital) => {
    hospital.hospitals_password = await bcrypt.hashSync(hospital.hospitals_password, 10);
  });

  return Hospitals;
};
