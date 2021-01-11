'use strict';

import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcryptjs";
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Pharmacy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pharmacy.init({
    pharmacy_name: DataTypes.STRING,
    pharmacy_email: DataTypes.STRING,
    pharmacy_password: DataTypes.STRING,
    pharmacy_phone: DataTypes.STRING,
    pharmacy_address: DataTypes.STRING,
    pharmacy_city: DataTypes.STRING,
    pharmacy_state: DataTypes.STRING,
    pharmacy_country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pharmacy',
    freezeTableName: true,
  });

  //  Before the Records will be created, let's d the following.
  Pharmacy.beforeCreate(async (pharmacy) => {
    pharmacy.id = uuidV4();
  });
  Pharmacy.beforeCreate(async (pharmacy) => {
    pharmacy.pharmacy_password = await bcrypt.hashSync(pharmacy.pharmacy_password, 10);
  });

  //  After the record is persisted and before the persisted data are returned, let's remove the "doctors_password".
  Pharmacy.afterCreate(async (pharmacy) => {
    delete pharmacy.dataValues.pharmacy_password;
  });

  return Pharmacy;
};
