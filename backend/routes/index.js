import express from "express"
const router = express.Router()
import repairLogRoute from './RepairLog.js'
import vehicleProfilesRoute from './VehicleProfiles.js';
import registerCarRoute from './RegisterCar.js';
import aiModalRoute from './aiModal.js';
import authRoute from './auth.js';


// Repair Log Routes
router.get('/repair/:user_id/:v_id', repairLogRoute)
router.get('/repair/:repair_id', repairLogRoute)
router.post('/create/:user_id/:v_id', repairLogRoute)
router.put('/update/:user_id/:repair_id', repairLogRoute)
router.delete('/delete/:repair_id', repairLogRoute)

// Register Car Route
router.post('/addVehicle/:user_id', registerCarRoute)

//AI Modal
router.post('/aiModal', aiModalRoute)

// Vehicle Profiles Routes
router.get("/getVehicles/:user_id", vehicleProfilesRoute)
router.get("/getCurrentVehicle/:user_id", vehicleProfilesRoute)
router.get("/getMileage/:user_id/:v_id", vehicleProfilesRoute);
router.put("/updateMileage/:user_id/:v_id", vehicleProfilesRoute)
router.put("/toggleCurrentAndNewCurrent/:user_id/:v_id", vehicleProfilesRoute)
router.delete("/deleteVehicle/:v_id", vehicleProfilesRoute) 

// Auth Route
router.post('/passUId', authRoute)



    
export default router