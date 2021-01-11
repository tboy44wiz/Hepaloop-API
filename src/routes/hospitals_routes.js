'use strict';

import { Router } from 'express';
import HospitalsController from "../controllers/hospitals_controller";

//  Set up Express Router.
const hospitalsRouter = Router();


//  Create a single hospital.
hospitalsRouter.post(
    '/create_hospital',
    HospitalsController.createHospital
);

//  Get all Hospitals.
hospitalsRouter.get(
    '/all_hospitals',
    HospitalsController.getAllHospitals
);

//  Get a single Hospital.
hospitalsRouter.get(
    '/single_hospital/:id',
    HospitalsController.getSingleHospital
);

//  Update a Staff.
hospitalsRouter.put(
    '/update_hospital/:id',
    HospitalsController.updateHospital
);

//  Delete a Hospital.
hospitalsRouter.delete(
    '/delete_hospital/:id',
    HospitalsController.deleteHospital
);



//  Hospitals SignUp.
hospitalsRouter.post(
    '/signup',
    HospitalsController.signUpHospital
);

//  Hospitals Login.
hospitalsRouter.post(
    '/login',
    HospitalsController.loginHospital
);

export default hospitalsRouter;
