'use strict';

import { Router } from 'express';
import TokenVerification from '../utils/token_verification';
import PatientsController from "../controllers/patients_controller";


//  Set up Express Router.
const patientsRouter = Router();



//  Create a single patient.
patientsRouter.post(
    '/create_patient',
    TokenVerification.patientsTokenVerification,
    PatientsController.createPatient
);

//  Get all Patients.
patientsRouter.get(
    '/all_patients',
    PatientsController.getAllPatients
);

//  Get a single Patient.
patientsRouter.get(
    '/single_patient/:id',
    PatientsController.getSinglePatient
);

//  Update a Staff.
patientsRouter.put(
    '/update_patient/:id',
    TokenVerification.patientsTokenVerification,
    PatientsController.updatePatient
);

//  Delete a Patient.
patientsRouter.delete(
    '/delete_patient/:id',
    TokenVerification.patientsTokenVerification,
    PatientsController.deletePatient
);



//  Patients SignUp.
patientsRouter.post(
    '/signup',
    PatientsController.signUpPatient
);

//  Patients Login.
patientsRouter.post(
    '/login',
    PatientsController.loginPatient
);

export default patientsRouter;
