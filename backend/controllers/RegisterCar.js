const mysql = require('mysql2')
const pool = require('../mysql/connection')

const addVehicle = () => {
    //As shown in the form only the vin and mileage will be saved to the vehicles record. Other information will later be gathered when the user decodes their vin in vinDecode.
}

module.exports = {addVehicle};