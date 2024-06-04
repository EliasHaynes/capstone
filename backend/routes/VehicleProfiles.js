import express from 'express'
import vehicleProfileControllers from '../api/VehicleProfiles.js'
const router = express.Router()

router.get("/getVehicles/:user_id", vehicleProfileControllers.getVehicles)
router.get("/getCurrentVehicle/:user_id", vehicleProfileControllers.getCurrentVehicleProfile)
router.get("/getMileage/:user_id/:v_id", vehicleProfileControllers.getVehicleMileage);
router.put("/updateMileage/:user_id/:v_id", vehicleProfileControllers.updateVehicleMileage)
router.put("/toggleCurrentAndNewCurrent/:user_id/:v_id", vehicleProfileControllers.togglingPrevCurrentAndNewCurrent)
router.delete("/deleteVehicle/:v_id", vehicleProfileControllers.deleteVehicle) 

export default router;