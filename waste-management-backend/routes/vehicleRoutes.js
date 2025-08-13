import express from 'express';
import { getCurrentVehicle, getNextVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/current', getCurrentVehicle);
router.get('/upcoming', getNextVehicle);

export default router;
