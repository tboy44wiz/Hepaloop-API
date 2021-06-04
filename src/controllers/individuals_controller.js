'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

import models from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";


const { Individuals } = models;

class IndividualsController {

    //  Create a single individual.
    static createIndividual = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.individualsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Individual already exist and create a new Individual using the "value" gotten from the validated object.
            const [individual, created] = await Individuals.findOrCreate({
                where: { individuals_email: value.individuals_email },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    'Individual already exist.'
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Successfully created a individual.',
                { individual }
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

    //  Get all Individuals.
    static getAllIndividuals = async (req, res) => {

        try {
            const individuals = await Individuals.findAll({
                attributes: {
                    exclude: ['individuals_password']
                }
            });
            if (!individuals) {
                const response = new Response(
                    false,
                    404,
                    "No individual found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Successfully created a individual.',
                { individuals }
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

    //  Get a single Individual.
    static getSingleIndividual = async (req, res) => {

        try {
            const { id } = req.params;
            const individual = await Individuals.findOne({
                where: { id },
                attributes: {
                    exclude: ['individuals_password']
                }
            });
            if (!individual) {
                const response = new Response(
                    false,
                    404,
                    "No individual found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Individual retrieved successfully.',
                { individual }
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

    //  Update a Staff.
    static updateIndividual = async (req, res) => {

        try {
            const payload = req.requestPayload;
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.individualsUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            if (value.individuals_email) {
                //  First check if a record has the staff_email existing.
                const foundItem = await Individuals.findOne({
                    where: { individuals_email: value.individuals_email }
                });
                if (foundItem) {
                    const response =  new Response(
                        false,
                        409,
                        "This email address already exist. Kindly use another email address."
                    );
                    return res.status(response.code).json(response);
                }

                //  If No record found with the same individuals email, then update.
                const updatedIndividual = await Individuals.update({ ...value }, { where: { id } });
                if (updatedIndividual[0] === 0) {
                    const response =  new Response(
                        false,
                        400,
                        "Failed to update individual."
                    );
                    return res.status(response.code).json(response);
                }

                const response =  new Response(
                    true,
                    200,
                    "Individual updated successfully."
                );
                return res.status(response.code).json(response);
            }

            //  If No record found with the same individuals email, then update.
            const updatedIndividual = await Individuals.update({ ...value }, { where: { id } });
            if (updatedIndividual[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update individual."
                );
                return res.status(response.code).json(response);
            }

            const response =  new Response(
                true,
                200,
                "Individual updated successfully."
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

    //  Delete a Individual.
    static deleteIndividual = async (req, res) => {

        try {
            const { id } = req.params;

            const isDeleted = await Individuals.destroy({
                where: { id }
            });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No individual found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Individual deleted successfully."
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



    //  Individuals SignUp.
    static signUpIndividual = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.individualsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Individual already exist and create a new Individual using the "value" gotten from the validated object.
            const [individual, created] = await Individuals.findOrCreate({
                where: { individuals_email: value.individuals_email },
                defaults: { ...value } //  "value" is gotten from the validated object.
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Individual already exist."
                );
                return res.status(response.code).json(response);
            }

            const { id, individuals_name, individuals_email, individuals_phone, individuals_avatar } = individual;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, individuals_name, individuals_email, individuals_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                individuals_name,
                individuals_email,
                individuals_phone,
                individuals_avatar,
                token
            }

            const response = new Response(
                true,
                201,
                "Successfully created a individual.",
                { individual: formattedResponse }
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

    //  Individuals Login.
    static loginIndividual = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.individualsLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const individual = await Individuals.findOne({
                where: { individuals_email: value.individuals_email }
            });
            if (!individual) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted individuals_password.
            const isPasswordMatched = await bcrypt.compareSync(value.individuals_password, individual.individuals_password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Please check your password and try again."
                );
                return res.status(response.code).json(response);
            }

            const { id, individuals_name, individuals_email, individuals_phone, individuals_avatar } = individual;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, individuals_name, individuals_email, individuals_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                ...individual.dataValues,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { individual: formattedResponse }
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
    static updateIndividualsAvatar = async (req, res) => {

        try {
            const payload = req.requestPayload;
            const filename = req.file.filename;
            const id = payload.id;
            const avatarURL = `http://${req.headers.host}/uploads/${filename}`;
            console.log(req.file);

            //  Update the Doctors Profile Photo..
            const updatedIndividuals = await Individuals.update(
                { individuals_avatar: avatarURL },
                { where: { id } }
            );
            if (updatedIndividuals[0] === 0) {
                const response = new Response(
                    false,
                    400,
                    "Failed to update profile photo."
                );
                return res.status(response.code).json(response);
            }

            //  Get the user back.
            const individual = await Individuals.findOne({
                where: { id },
                attributes: {
                    exclude: ['individuals_password']
                }
            });

            const response = new Response(
                true,
                200,
                'Successfully updated profile photo.',
                { individual }
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
                'Successfully created a individual.'
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

export default IndividualsController;
