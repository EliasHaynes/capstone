const mysql = require('mysql2')
const pool = require('../mysql/connection')
const axios = require('axios')
require('dotenv').config()


const token = process.env.TOKEN
const key = process.env.CAR_KEY

const addVehicle = async (req,res) => {
    const user_id = req.params.user_id;
    const vin = req.body.vin;
    const vehicleSpecs = await idVehicleNameFromVin(vin);
    const YMM = vehicleSpecs.YMM;
    const engine = vehicleSpecs.engine;
    const trim = vehicleSpecs.trim;
    const transmission = vehicleSpecs.transmission;
    try {
        //Check if the user has any record of registered cars
        const sql = "SELECT * FROM vehicles WHERE user_id = ?";        
        const response = await pool.query(sql, [user_id], (err, data) => {
            if (err) return res.json(err);
      
            return res.json(data);
          });
          

  // console.log("The response in Register car:", response)
          //If user doesnt have existing registered car then set it to current profile by default
          if (response[0].length < 1) {
            const sql = "INSERT IGNORE INTO vehicles (`vin`, mileage, `v_ymm`, `v_engine`, `v_trim`, `v_transmission`, currentVProfile, `user_id`) VALUES (?)"
            const values = [
                vin,
                parseInt(req.body.mileage),
                YMM,
                engine,
                trim,
                transmission,
                1,
                user_id
            ]
            pool.query(sql,[values], (err,data) => {
                if (err) return res.json(err);
                return res.json(data);
            })
          } 
        //If user already has existing registered car dont set it to current profile by default
          else {
            const sql = "INSERT IGNORE INTO vehicles (`vin`, mileage,`v_ymm`, `v_engine`, `v_trim`, `v_transmission`, currentVProfile, `user_id`) VALUES (?)"
            const values = [
                req.body.vin,
                parseInt(req.body.mileage),
                YMM,
                engine,
                trim,
                transmission,
                0,
                user_id
            ]
            pool.query(sql,[values], (err,data) => {
                if (err) return res.json(err);
                return res.json(data);
            })
          }
          
    } catch (e) {
        console.error(e)
    }
}

const idVehicleNameFromVin = async (vin) => {
  try {
    const response = await axios.get(`http://api.carmd.com/v3.0/decode?vin=${vin}`, {
    headers: {
      authorization: `Basic ${key}`,
      "partner-token": token
    }
  })
  const theData = response.data.data;
  console.log("CarMD Response:", response.data.data)
  const YMM = theData.year + " " + theData.make + " " + theData.model
  const engine = theData.engine;
  const trim = theData.trim;
  const transmission = theData.transmission;
  console.log("YMM:", YMM)
  console.log("engine:", engine )
  console.log("trim:", trim )
  console.log("transmission:", transmission )
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

module.exports = {addVehicle};