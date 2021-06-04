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
        doctors_gender: Joi.string(),
        doctors_specialty: Joi.string(),
        doctors_address: Joi.string(),
        doctors_city: Joi.string(),
        doctors_state: Joi.string(),
        doctors_country: Joi.string(),
        doctors_hospital: Joi.string(),
        doctors_SYOP: Joi.string(),
        doctors_bioInfo: Joi.string(),
        doctors_rating: Joi.string(),
        doctors_avatar: Joi.string(),
        doctors_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        doctors_confirmPassword: Joi.string().required().valid(Joi.ref('doctors_password')),
        user_type: Joi.string().required()
    });

    //  Doctors Update Validation Schema.
    static doctorsUpdateSchema = Joi.object({
        doctors_name: Joi.string().min(3),
        doctors_email: Joi.string().email(),
        doctors_phone: Joi.string(),
        doctors_gender: Joi.string(),
        doctors_specialty: Joi.string(),
        doctors_address: Joi.string(),
        doctors_city: Joi.string(),
        doctors_state: Joi.string(),
        doctors_country: Joi.string(),
        doctors_hospital: Joi.string(),
        doctors_SYOP: Joi.string(),
        doctors_bioInfo: Joi.string(),
        doctors_rating: Joi.string(),
        doctors_avatar: Joi.string(),
        doctors_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        doctors_confirmPassword: Joi.string().valid(Joi.ref('doctors_password')),
    });

    //  Doctors Login Validation Schema.
    static doctorsLoginSchema = Joi.object({
        doctors_email: Joi.string().required().email(),
        doctors_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        user_type: Joi.string().required()
    });


    /*=====================================================================================*/
    /*=================================== FOR PATIENTS ====================================*/

    //  Individuals Validation Schema.
    static individualsSchema = Joi.object({
        individuals_name: Joi.string().required().min(3),
        individuals_email: Joi.string().required().email(),
        individuals_phone: Joi.string().required(),
        individuals_gender: Joi.string(),
        individuals_DOB: Joi.string(),
        individuals_age: Joi.number(),
        individuals_address: Joi.string(),
        individuals_city: Joi.string(),
        individuals_state: Joi.string(),
        individuals_country: Joi.string(),
        individuals_height: Joi.string(),
        individuals_weight: Joi.string(),
        individuals_avatar: Joi.string(),
        individuals_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        individuals_confirmPassword: Joi.string().required().valid(Joi.ref('individuals_password')),
        user_type: Joi.string().required()
    });

    //  Individuals Update Validation Schema.
    static individualsUpdateSchema = Joi.object({
        individuals_name: Joi.string().min(3),
        individuals_email: Joi.string().email(),
        individuals_phone: Joi.string(),
        individuals_gender: Joi.string(),
        individuals_DOB: Joi.string(),
        individuals_age: Joi.number(),
        individuals_address: Joi.string(),
        individuals_city: Joi.string(),
        individuals_state: Joi.string(),
        individuals_country: Joi.string(),
        individuals_height: Joi.string(),
        individuals_weight: Joi.string(),
        individuals_avatar: Joi.string(),
        individuals_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        individuals_confirmPassword: Joi.string().valid(Joi.ref('individuals_password')),
    });

    //  Individuals Login Validation Schema.
    static individualsLoginSchema = Joi.object({
        individuals_email: Joi.string().required().email(),
        individuals_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        user_type: Joi.string().required()
    });


    /*=====================================================================================*/
    /*=================================== FOR HOSPITALS ====================================*/

    //  Hospitals Validation Schema.
    static hospitalsSchema = Joi.object({
        hospitals_name: Joi.string().required().min(3),
        hospitals_email: Joi.string().required().email(),
        hospitals_phone: Joi.string().required(),
        hospitals_address: Joi.string(),
        hospitals_city: Joi.string(),
        hospitals_state: Joi.string(),
        hospitals_country: Joi.string(),
        hospital_DOR: Joi.string(),
        hospital_profileInfo: Joi.string(),
        hospitals_logo: Joi.string(),
        hospitals_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        hospitals_confirmPassword: Joi.string().required().valid(Joi.ref('hospitals_password')),
        user_type: Joi.string().required(),
    });

    //  Hospitals Update Validation Schema.
    static hospitalsUpdateSchema = Joi.object({
        hospitals_name: Joi.string().min(3),
        hospitals_email: Joi.string().email(),
        hospitals_phone: Joi.string(),
        hospitals_address: Joi.string(),
        hospitals_city: Joi.string(),
        hospitals_state: Joi.string(),
        hospitals_country: Joi.string(),
        hospitals_DOR: Joi.string(),
        hospitals_profileInfo: Joi.string(),
        hospitals_logo: Joi.string(),
        hospitals_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        // hospitals_password: Joi.string().valid(Joi.ref('individuals_password')),
    });

    //  Hospitals Login Validation Schema.
    static hospitalsLoginSchema = Joi.object({
        hospitals_email: Joi.string().email(),
        hospitals_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        user_type: Joi.string().required()
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
        pharmacy_DOR: Joi.string(),
        pharmacy_profileInfo: Joi.string(),
        pharmacy_logo: Joi.string(),
        pharmacy_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        pharmacy_confirmPassword: Joi.string().required().valid(Joi.ref('pharmacy_password')),
        user_type: Joi.string().required()
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
        pharmacy_DOR: Joi.string(),
        pharmacy_profileInfo: Joi.string(),
        pharmacy_logo: Joi.string(),
        pharmacy_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        // pharmacy_confirmPassword: Joi.string().valid(Joi.ref('pharmacy_password')),
    });

    //  Pharmacy Login Validation Schema.
    static pharmacyLoginSchema = Joi.object({
        pharmacy_email: Joi.string().email(),
        pharmacy_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        user_type: Joi.string().required()
    });

}
export default JoiValidator;
