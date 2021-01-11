'use strict';

import Joi from 'joi';

class JoiValidator {

    /*=====================================================================================*/
    /*=================================== FOR DOCTORS =====================================*/

    //  Doctors Validation Schema.
    static doctorsSchema = Joi.object({
        doctors_name: Joi.string().required().min(3),
        doctors_email: Joi.string().required().email(),
        doctors_phone: Joi.string().required(),
        doctors_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  Doctors Update Validation Schema.
    static doctorsUpdateSchema = Joi.object({
        doctors_name: Joi.string().min(3),
        doctors_email: Joi.string().email(),
        doctors_phone: Joi.string(),
        doctors_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  Doctors Login Schema.
    static doctorsLoginSchema = Joi.object({
        doctors_email: Joi.string().required().email(),
        doctors_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });


    /*=====================================================================================*/
    /*=================================== FOR PATIENTS ====================================*/

    //  Patients Validation Schema.
    static patientsSchema = Joi.object({
        patients_name: Joi.string().required().min(3),
        patients_email: Joi.string().required().email(),
        patients_phone: Joi.string().required(),
        patients_gender: Joi.string(),
        patients_DOB: Joi.string(),
        patients_age: Joi.number(),
        patients_address: Joi.string(),
        patients_city: Joi.string(),
        patients_state: Joi.string(),
        patients_country: Joi.string(),
        patients_height: Joi.string(),
        patients_weight: Joi.string(),
        patients_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  Patients Update Validation Schema.
    static patientsUpdateSchema = Joi.object({
        patients_name: Joi.string().min(3),
        patients_email: Joi.string().email(),
        patients_phone: Joi.string(),
        patients_gender: Joi.string(),
        patients_DOB: Joi.string(),
        patients_age: Joi.number(),
        patients_address: Joi.string(),
        patients_city: Joi.string(),
        patients_state: Joi.string(),
        patients_country: Joi.string(),
        patients_height: Joi.string(),
        patients_weight: Joi.string(),
        patients_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  Patients Login Schema.
    static patientsLoginSchema = Joi.object({
        patients_email: Joi.string().required().email(),
        patients_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });


    /*=====================================================================================*/
    /*=================================== FOR HOSPITALS ====================================*/

    //  Hospitals Validation Schema.
    static hospitalsSchema = Joi.object({
        hospitals_name: Joi.string().required().min(3),
        hospitals_email: Joi.string().required().email(),
        hospitals_address: Joi.string().required(),
        hospitals_phone: Joi.string().required(),
    });

    //  Hospitals Update Validation Schema.
    static hospitalsUpdateSchema = Joi.object({
        hospitals_name: Joi.string().min(3),
        hospitals_email: Joi.string().email(),
        hospitals_address: Joi.string(),
        hospitals_phone: Joi.string(),
    });


    /*=====================================================================================*/
    /*=================================== FOR PHARMACY ====================================*/

    //  Pharmacy Validation Schema.
    static pharmacySchema = Joi.object({
        pharmacy_name: Joi.string().required().min(3),
        pharmacy_email: Joi.string().required().email(),
        pharmacy_phone: Joi.string().required(),
        pharmacy_address: Joi.string(),
        pharmacy_city: Joi.string(),
        pharmacy_state: Joi.string(),
        pharmacy_country: Joi.string(),
        pharmacy_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

    //  Pharmacy Update Validation Schema.
    static pharmacyUpdateSchema = Joi.object({
        pharmacy_name: Joi.string().min(3),
        pharmacy_email: Joi.string().email(),
        pharmacy_phone: Joi.string(),
        pharmacy_address: Joi.string(),
        pharmacy_city: Joi.string(),
        pharmacy_state: Joi.string(),
        pharmacy_country: Joi.string(),
        pharmacy_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });

}
export default JoiValidator;
