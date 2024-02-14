const express = require('express')
const router = express.Router()
const vehicleProfileControllers = require("../controllers/VehicleProfiles")

router.get("/getVehicles/:user_id", vehicleProfileControllers.getVehicles)
router.get("/getCurrentVehicle/:user_id", vehicleProfileControllers.getCurrentVehicleProfile)
router.put("/toggleCurrentAndNewCurrent/:user_id/:v_id", vehicleProfileControllers.togglingPrevCurrentAndNewCurrent)
router.delete("/deleteVehicle/:v_id", vehicleProfileControllers.deleteVehicle) 

module.exports = router;