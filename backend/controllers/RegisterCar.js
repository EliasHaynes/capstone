const mysql = require('mysql2')
const pool = require('../mysql/connection')
const axios = require('axios')
require('dotenv').config()


const token = process.env.TOKEN
const key = process.env.CAR_KEY

const addVehicle = async (req, res) => {
    const user_id = req.params.user_id;
    const vin = req.body.vin;

    try {
        const vehicleSpecs = await idVehicleNameFromVin(vin);
        const vImg = await vehicleImage(vin);
        const { YMM, engine, trim, transmission } = vehicleSpecs;
        const { theData } = vImg

        // Check if the user has any record of registered cars
        const checkVehiclesSql = "SELECT * FROM vehicles WHERE user_id = ?";
        const [vehicles] = await pool.query(checkVehiclesSql, [user_id]);

        // Check if user has 4 or more registered vehicles
        if (vehicles.length >= 4) {
            return res.send("Max limit of registered vehicles reached");
        } 

        // Determine if the vehicle should be set as current
        const isCurrentVehicle = vehicles.length < 1 ? 1 : 0;

        // Prepare SQL query and values
        const insertSql = `INSERT INTO vehicles (vin, mileage, v_ymm, v_engine, v_trim, v_transmission, currentVProfile, v_img, user_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            vin,
            parseInt(req.body.mileage),
            YMM,
            engine,
            trim,
            transmission,
            isCurrentVehicle,
            theData,
            user_id
        ];

        // Execute insert query
        const [insertResult] = await pool.query(insertSql, values);
        return res.json(insertResult);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred while adding the vehicle." });
    }
};


const idVehicleNameFromVin = async (vin) => {
  try {
    const response = await axios.get(`http://api.carmd.com/v3.0/decode?vin=${vin}`, {
    headers: {
      authorization: `Basic ${key}`,
      "partner-token": token
    }
  })
  const theData = response.data.data;

  const YMM = theData.year + " " + theData.make + " " + theData.model
  const engine = theData.engine;
  const trim = theData.trim;
  const transmission = theData.transmission;

  const vehicleInfo = {
    YMM,
    engine,
    trim,
    transmission
  }
  return vehicleInfo;
  }
  catch (e) {
    console.log(e);
  }
}

const vehicleImage = async (vin) => {
  try {
    const response = await axios.get(
      `http://api.carmd.com/v3.0/image?vin=${vin}`,
      {
        headers: {
          authorization: `Basic ${key}`,
          "partner-token": token,
        },
      }
    );
    const theData = response.data.data.image;
    

    const imgURL = {
      theData
    }

      return imgURL;

  } catch(e) {
    console.error(e);
  }
}

module.exports = {addVehicle};