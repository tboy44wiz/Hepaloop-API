'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

import db from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";


const { Pharmacy } = db;

class PharmacyController {

    //  Create a single pharmacy.
    static createPharmacy = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.pharmacySchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Pharmacy already exist and create a new Pharmacy using the "value" gotten from the validated object.
            const [pharmacy, created] = await Pharmacy.findOrCreate({
                where: { pharmacy_email: requestBody.pharmacy_email },
                defaults: { ...value },
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    'Pharmacy already exist.'
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Successfully created a pharmacy.',
                { pharmacy }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Get all Pharmacy.
    static getAllPharmacy = async (req, res) => {

        try {
            const pharmacy = await Pharmacy.findAll({
                attributes: {
                    exclude: ['pharmacy_password']
                }
            });
            if (!pharmacy) {
                const response = new Response(
                    false,
                    404,
                    "No pharmacy found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Successfully created a pharmacy.',
                { pharmacy }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Get a single Pharmacy.
    static getSinglePharmacy = async (req, res) => {

        try {
            const { id } = req.params;
            const pharmacy = await Pharmacy.findOne({
                where: { id },
                attributes: {
                    exclude: ['pharmacy_password']
                }
            });
            if (!pharmacy) {
                const response = new Response(
                    false,
                    404,
                    "No pharmacy found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Pharmacy retrieved successfully.',
                { pharmacy }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Update a Pharmacy.
    static updatePharmacy = async (req, res) => {

        try {
            const payload = req.requestPayload;
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.pharmacyUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            if (value.pharmacy_email) {
                //  First check if a record has the pharmacy_email existing.
                const foundItem = await Pharmacy.findOne({
                    where: { pharmacy_email: value.pharmacy_email }
                });
                if (foundItem) {
                    const response =  new Response(
                        false,
                        409,
                        "This email address already exist. Kindly use another email address."
                    );
                    return res.status(response.code).json(response);
                }

                //  If No record found with the same pharmacy email, then update.
                const updatedPharmacy = await Pharmacy.update({ ...value }, { where: { id } });
                if (updatedPharmacy[0] === 0) {
                    const response =  new Response(
                        false,
                        400,
                        "Failed to update pharmacy."
                    );
                    return res.status(response.code).json(response);
                }

                const response =  new Response(
                    true,
                    200,
                    "Pharmacy updated successfully."
                );
                return res.status(response.code).json(response);

            }

            //  If No record found with the same pharmacy email, then update.
            const updatedPharmacy = await Pharmacy.update({ ...value }, { where: { id } });
            if (updatedPharmacy[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update pharmacy."
                );
                return res.status(response.code).json(response);
            }

            const response =  new Response(
                true,
                200,
                "Pharmacy updated successfully."
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Delete a Pharmacy.
    static deletePharmacy = async (req, res) => {

        try {
            const { id } = req.params;

            const isDeleted = await Pharmacy.destroy({
                where: { id }
            });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No pharmacy found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Pharmacy deleted successfully."
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };



    //  Pharmacy SignUp.
    static signUpPharmacy = async (req, res) => {

        try {
            const requestBody = req.body;
            //  Validate the Request Body.
            const { error, value } = await JoiValidator.pharmacySchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Pharmacy already exist and create a new Pharmacy using the "value" gotten from the validated object.
            const [pharmacy, created] = await Pharmacy.findOrCreate({
                where: { pharmacy_email: value.pharmacy_email },
                defaults: { ...value } //  "value" is gotten from the validated object.
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Pharmacy already exist."
                );
                return res.status(response.code).json(response);
            }

            const { id, pharmacy_name, pharmacy_email, pharmacy_phone, pharmacy_logo, createdAt } = pharmacy;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, pharmacy_name, pharmacy_email, pharmacy_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                pharmacy_name,
                pharmacy_email,
                pharmacy_phone,
                pharmacy_logo,
                createdAt,
                token
            }

            const response = new Response(
                true,
                201,
                "Successfully created a pharmacy.",
                { pharmacy: formattedResponse }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };

    //  Pharmacy Login.
    static loginPharmacy = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.pharmacyLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const pharmacy = await Pharmacy.findOne({
                where: { pharmacy_email: value.pharmacy_email }
            });
            if (!pharmacy) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted pharmacy_password.
            const isPasswordMatched = await bcrypt.compareSync(value.pharmacy_password, pharmacy.pharmacy_password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Please check your password and try again."
                );
                return res.status(response.code).json(response);
            }

            const { id, pharmacy_name, pharmacy_email, pharmacy_phone, pharmacy_logo } = pharmacy;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, pharmacy_name, pharmacy_email, pharmacy_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                ...pharmacy.dataValues,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { pharmacy: formattedResponse }
            );
            res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };


    //  Uploading Users Profile Avatar.
    static updatePharmacysAvatar = async (req, res) => {

        try {
            const payload = req.requestPayload;
            const filename = req.file.filename;
            const id = payload.id;
            const avatarURL = `http://${req.headers.host}/uploads/${filename}`;
            console.log(req.file);

            //  Update the Pharmacy Profile Logo..
            const updatedPharmacy = await Pharmacy.update(
                { pharmacy_logo: avatarURL },
                { where: { id } }
                );
            if (updatedPharmacy[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update profile photo."
                );
                return res.status(response.code).json(response);
            }

            //  Get the user back.
            const pharmacy = await Pharmacy.findOne({
                where: { id },
                attributes: {
                    exclude: ['pharmacy_password']
                }
            });
            if (!pharmacy) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            const { pharmacy_name, pharmacy_email, pharmacy_phone, pharmacy_avatar } = pharmacy;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, pharmacy_name, pharmacy_email, pharmacy_phone },
                `${process.env.JWT_SECRET_KEY}`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                pharmacy_name,
                pharmacy_email,
                pharmacy_phone,
                pharmacy_avatar,
                token
            }

            const response = new Response(
                true,
                200,
                'Successfully updated profile photo.',
                { pharmacy: formattedResponse }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${error}`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };



    static sampleOption = async (req, res) => {

        try {


            const response = new Response(
                true,
                200,
                'Successfully created a pharmacy.'
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);

            const response = new Response(
                false,
                500,
                'Server error, please try again later.'
            );
            return res.status(response.code).json(response);
        }
    };
}

export default PharmacyController;
