const express = require('express')
const router = express.Router()
const registerCarController = require("../controllers/RegisterCar")


router.post("/addVehicle/:user_id", registerCarController.addVehicle) //addVehicle

module.exports = router;