'use strict';

import { Router } from 'express';

//  Import all the required routes.
import doctorsRouter from './doctors_routes';
import individualsRouter from './individuals_routes';
import hospitalsRouter from "./hospitals_routes";
import pharmacyRouter from "./pharmacy_routes";


//  Initialize Express Router.
const router = Router();

router.use('/doctors', doctorsRouter);
router.use('/individuals', individualsRouter);
router.use('/hospitals', hospitalsRouter);
router.use('/pharmacy', pharmacyRouter);


export default router;
