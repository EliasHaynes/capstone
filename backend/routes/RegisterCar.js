import express from 'express';
const router = express.Router()
import registerCarController from '../api/RegisterCar.js'


router.post("/addVehicle/:user_id", registerCarController.addVehicle)

export default router;