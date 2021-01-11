'use strict';

import { Router } from 'express';
import PharmacyController from "../controllers/pharmacy_controller";

//  Set up Express Router.
const pharmacyRouter = Router();


//  Create a single pharmacy.
pharmacyRouter.post(
    '/create_pharmacy',
    // TokenVerification.pharmacyTokenVerification,
    PharmacyController.createPharmacy
);

//  Get all Pharmacy.
pharmacyRouter.get(
    '/all_pharmacy',
    PharmacyController.getAllPharmacy
);

//  Get a single Pharmacy.
pharmacyRouter.get(
    '/single_pharmacy/:id',
    PharmacyController.getSinglePharmacy
);

//  Update a Staff.
pharmacyRouter.put(
    '/update_pharmacy/:id',
    // TokenVerification.pharmacyTokenVerification,
    PharmacyController.updatePharmacy
);

//  Delete a Pharmacy.
pharmacyRouter.delete(
    '/delete_pharmacy/:id',
    // TokenVerification.pharmacyTokenVerification,
    PharmacyController.deletePharmacy
);



//  Pharmacy SignUp.
pharmacyRouter.post(
    '/signup',
    PharmacyController.signUpPharmacy
);

//  Pharmacy Login.
pharmacyRouter.post(
    '/login',
    PharmacyController.loginPharmacy
);

export default pharmacyRouter;
