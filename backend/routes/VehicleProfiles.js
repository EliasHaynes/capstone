const express = require('express')
const router = express.Router()
const vehicleProfileControllers = require("../controllers/VehicleProfiles")

router.get("/getVehicles/:user_id", vehicleProfileControllers.getVehicles) //getVehicles
router.put("/selectVehicle/:user_id/:v_id", vehicleProfileControllers.selectVehicle) //selectVehicles
router.put("/updateVehicle/:user_id/:v_id", vehicleProfileControllers.updateVehicle) //updateVehicles
router.delete("/deleteVehicle/:v_id", vehicleProfileControllers.deleteVehicle) //deleteVehicles

module.exports = router;