'use strict';

import { Router } from 'express';
import TokenVerification from '../utils/token_verification';
import DoctorsController from '../controllers/doctors_controller';
import upload from "../controllers/user_avatar_upload_controller";

//  Set up Express Router.
const doctorsRouter = Router();


//  Create a single doctor.
doctorsRouter.post(
    '/create_doctor',
    TokenVerification.doctorsTokenVerification,
    DoctorsController.createDoctor
);

//  Get all Doctors.
doctorsRouter.get(
    '/all_doctors',
    DoctorsController.getAllDoctors
);

//  Get a single Doctor.
doctorsRouter.get(
    '/single_doctor/:id',
    DoctorsController.getSingleDoctor
);

//  Update a Staff.
doctorsRouter.put(
    '/update_doctor/:id',
    TokenVerification.doctorsTokenVerification,
    DoctorsController.updateDoctor
);

//  Delete a Doctor.
doctorsRouter.delete(
    '/delete_doctor/:id',
    TokenVerification.doctorsTokenVerification,
    DoctorsController.deleteDoctor
);



//  Doctors SignUp.
doctorsRouter.post(
    '/signup',
    DoctorsController.signUpDoctor
);

//  Doctors Login.
doctorsRouter.post(
    '/login',
    DoctorsController.loginDoctor
);



//  Uploading Users Profile Avatar.
doctorsRouter.put(
    '/update_avatar',
    TokenVerification.doctorsTokenVerification,
    upload.single('avatar'),
    DoctorsController.updateDoctorsAvatar
);

export default doctorsRouter;
