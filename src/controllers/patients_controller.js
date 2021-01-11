'use strict';

import jwt from 'jsonwebtoken'
import models from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";


const { Patients } = models;

class PatientsController {

    //  Create a single patient.
    static createPatient = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.patientsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Patient already exist and create a new Patient using the "value" gotten from the validated object.
            const [patient, created] = await Patients.findOrCreate({
                where: { patients_email: value.patients_email },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    'Patient already exist.'
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Successfully created a patient.',
                { patient }
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

    //  Get all Patients.
    static getAllPatients = async (req, res) => {

        try {
            const patients = await Patients.findAll({
                attributes: {
                    exclude: ['patients_password']
                }
            });
            if (!patients) {
                const response = new Response(
                    false,
                    404,
                    "No patient found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Successfully created a patient.',
                { patients }
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

    //  Get a single Patient.
    static getSinglePatient = async (req, res) => {

        try {
            const { id } = req.params;
            const patient = await Patients.findOne({
                where: { id },
                attributes: {
                    exclude: ['patients_password']
                }
            });
            if (!patient) {
                const response = new Response(
                    false,
                    404,
                    "No patient found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Patient retrieved successfully.',
                { patient }
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
    static updatePatient = async (req, res) => {

        try {
            const payload = req.requestPayload;
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.patientsUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  First check if a record has the staff_email existing.
            const foundItem = await Patients.findOne({
                where: { patients_email: value.patients_email }
            });
            if (foundItem) {
                const response =  new Response(
                    false,
                    409,
                    "This email address already exist. Kindly use another email address."
                );
                return res.status(response.code).json(response);
            }

            //  If No record found with the same patients email, then update.
            const updatedPatient = await Patients.update({ ...value }, { where: { id } });
            if (updatedPatient[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update patient."
                );
                return res.status(response.code).json(response);
            }

            const response =  new Response(
                true,
                200,
                "Patient updated successfully."
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

    //  Delete a Patient.
    static deletePatient = async (req, res) => {

        try {
            const { id } = req.params;

            const isDeleted = await Patients.destroy({
                where: { id }
            });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No patient found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Patient deleted successfully."
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



    //  Patients SignUp.
    static signUpPatient = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.patientsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Patient already exist and create a new Patient using the "value" gotten from the validated object.
            const [patient, created] = await Patients.findOrCreate({
                where: { patients_email: requestBody.patients_email },
                defaults: { ...value } //  "value" is gotten from the validated object.
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Patient already exist."
                );
                return res.status(response.code).json(response);
            }

            const { id, patients_name, patients_email, patients_phone } = patient;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, patients_name, patients_email, patients_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                patients_name,
                patients_email,
                patients_phone,
                token
            }

            const response = new Response(
                true,
                201,
                "Successfully created a patient.",
                { patients: formattedResponse }
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

    //  Patients Login.
    static loginPatient = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.patientsLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const patient = await Patients.findOne({
                where: { patients_email: value.patients_email }
            });
            if (!patient) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted patients_password.
            const isPasswordMatched = await bcrypt.compareSync(value.patients_password, patient.patients_password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Please check your password and try again."
                );
                return res.status(response.code).json(response);
            }

            const { id, patients_name, patients_email, patients_phone } = patient;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, patients_name, patients_email, patients_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                patients_name,
                patients_email,
                patients_phone,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { patient: formattedResponse }
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



    static sampleOption = async (req, res) => {

        try {


            const response = new Response(
                true,
                200,
                'Successfully created a patient.'
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

export default PatientsController;
