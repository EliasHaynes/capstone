const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')
const vehicleProfilesRoute = require("./VehicleProfiles")
const registerCarRoute = require('./RegisterCar')
const { checkJwt } = require('../middleware')



//Repair Log Routes
router.get('/repair', repairLogRoute)
router.get('/repair/:auth0_id', repairLogRoute)
router.get('/repair/:auth0_id/:id',repairLogRoute)
router.post('/create', repairLogRoute)
router.put('/update/:auth0_id/:id', repairLogRoute)
router.delete('/delete/:id', repairLogRoute)

//Register Car Route
router.get('/addVehicle/:user_id', registerCarRoute)

//Vehicle Profiles Routes
router.get('/getVehicles/:user_id', vehicleProfilesRoute)
router.put('/selectVehicle/:user_id/:v_id', vehicleProfilesRoute);
router.put('/updateVehicle/:user_id/:v_id', vehicleProfilesRoute);
router.delete('/deleteVehicle/:v_id', vehicleProfilesRoute)


    
module.exports = router;
