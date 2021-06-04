'use strict';

import { Router } from 'express';
import TokenVerification from '../utils/token_verification';
import IndividualsController from "../controllers/individuals_controller";
import userAvatarUpload from "../controllers/user_avatar_upload_controller";
import DoctorsController from "../controllers/doctors_controller";
import doctorsRouter from "./doctors_routes";


//  Set up Express Router.
const individualsRouter = Router();



//  Create a single individual.
individualsRouter.post(
    '/create_individual',
    TokenVerification.individualsTokenVerification,
    IndividualsController.createIndividual
);

//  Get all Individuals.
individualsRouter.get(
    '/all_individuals',
    IndividualsController.getAllIndividuals
);

//  Get a single Individual.
individualsRouter.get(
    '/single_individual/:id',
    IndividualsController.getSingleIndividual
);

//  Update a Staff.
individualsRouter.put(
    '/update_individual/:id',
    TokenVerification.individualsTokenVerification,
    IndividualsController.updateIndividual
);

//  Delete a Individual.
individualsRouter.delete(
    '/delete_individual/:id',
    TokenVerification.individualsTokenVerification,
    IndividualsController.deleteIndividual
);



//  Individuals SignUp.
individualsRouter.post(
    '/signup',
    IndividualsController.signUpIndividual
);

//  Individuals Login.
individualsRouter.post(
    '/login',
    IndividualsController.loginIndividual
);



//  Uploading Users Profile Avatar.
individualsRouter.put(
    '/update_avatar',
    TokenVerification.individualsTokenVerification,
    userAvatarUpload,
    IndividualsController.updateIndividualsAvatar
);

export default individualsRouter;
