const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')
const vehicleProfilesRoute = require("./VehicleProfiles")
const registerCarRoute = require('./RegisterCar')
const authRoute = require('./auth')
const { checkJwt } = require('../middleware')


// Repair Log Routes
router.get('/repair', repairLogRoute)
router.get('/repair/:auth0_id', repairLogRoute)
router.get('/repair/:auth0_id/:id',repairLogRoute)
router.post('/create', repairLogRoute)
router.put('/update/:auth0_id/:id', repairLogRoute)
router.delete('/delete/:id', repairLogRoute)

// Register Car Route
router.post('/addVehicle/:user_id', registerCarRoute)

// Vehicle Profiles Routes
router.get("/getVehicles/:user_id", vehicleProfilesRoute)
router.get("/getCurrentVehicle/:user_id", vehicleProfilesRoute)
router.put("/toggleCurrentAndNewCurrent/:user_id/:v_id", vehicleProfilesRoute)
router.delete("/deleteVehicle/:v_id", vehicleProfilesRoute) 

// Auth Route
router.post('/passUId', authRoute)

    
module.exports = router;
