'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

import db from '../database/models';
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";


const { Doctors } = db;

class DoctorsController {

    //  Create a single doctor.
    static createDoctor = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.doctorsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Doctor already exist and create a new Doctor using the "value" gotten from the validated object.
            const [doctor, created] = await Doctors.findOrCreate({
                where: { doctors_email: requestBody.doctors_email },
                defaults: { ...value },
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    'Doctor already exist.'
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                'Successfully created a doctor.',
                { doctor }
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

    //  Get all Doctors.
    static getAllDoctors = async (req, res) => {

        try {
            const doctors = await Doctors.findAll({
                attributes: {
                    exclude: ['doctors_password']
                }
            });
            if (!doctors) {
                const response = new Response(
                    false,
                    404,
                    "No doctor found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Successfully created a doctor.',
                { doctors }
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

    //  Get a single Doctor.
    static getSingleDoctor = async (req, res) => {

        try {
            const { id } = req.params;
            const doctor = await Doctors.findOne({
                where: { id },
                attributes: {
                    exclude: ['doctors_password']
                }
            });
            if (!doctor) {
                const response = new Response(
                    false,
                    404,
                    "No doctor found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                'Doctor retrieved successfully.',
                { doctor }
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

    //  Update a Doctor.
    static updateDoctor = async (req, res) => {

        try {
            const payload = req.requestPayload;
            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.doctorsUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  First check if a record has the staff_email existing.
            const foundItem = await Doctors.findOne({
                where: { doctors_email: value.doctors_email }
            });
            if (foundItem) {
                const response =  new Response(
                    false,
                    409,
                    "This email address already exist. Kindly use another email address."
                );
                return res.status(response.code).json(response);
            }

            //  If No record found with the same doctors email, then update.
            const updatedDoctor = await Doctors.update({ ...value }, { where: { id } });
            if (updatedDoctor[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update doctor."
                );
                return res.status(response.code).json(response);
            }

            const response =  new Response(
                true,
                200,
                "Doctor updated successfully."
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

    //  Delete a Doctor.
    static deleteDoctor = async (req, res) => {

        try {
            const { id } = req.params;

            const isDeleted = await Doctors.destroy({
                where: { id }
            });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No doctor found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Doctor deleted successfully."
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



    //  Doctors SignUp.
    static signUpDoctor = async (req, res) => {

        try {
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.doctorsSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Doctor already exist and create a new Doctor using the "value" gotten from the validated object.
            const [doctor, created] = await Doctors.findOrCreate({
                where: { doctors_email: requestBody.doctors_email },
                defaults: { ...value } //  "value" is gotten from the validated object.
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Doctor already exist."
                );
                return res.status(response.code).json(response);
            }

            const { id, doctors_name, doctors_email, doctors_phone, createdAt, updatedAt } = doctor;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, doctors_name, doctors_email, doctors_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                doctors_name,
                doctors_email,
                doctors_phone,
                createdAt,
                updatedAt,
                token
            }

            const response = new Response(
                true,
                201,
                "Successfully created a doctor.",
                { doctors: formattedResponse }
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

    //  Doctors Login.
    static loginDoctor = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.doctorsLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const doctor = await Doctors.findOne({
                where: { doctors_email: value.doctors_email }
            });
            if (!doctor) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted doctors_password.
            const isPasswordMatched = await bcrypt.compareSync(value.doctors_password, doctor.doctors_password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Please check your password and try again."
                );
                return res.status(response.code).json(response);
            }

            const { id, doctors_name, doctors_email, doctors_phone } = doctor;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, doctors_name, doctors_email, doctors_phone },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                doctors_name,
                doctors_email,
                doctors_phone,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { doctor: formattedResponse }
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
                'Successfully created a doctor.'
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

export default DoctorsController;
