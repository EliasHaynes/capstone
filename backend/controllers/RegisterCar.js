const mysql = require('mysql2')
const pool = require('../mysql/connection')

const addVehicle = async (req,res) => {
    const user_id = req.params.user_id
    try {
        //Check if the user has any record of registered cars
        const sql = "SELECT * FROM vehicles WHERE user_id = ?";        
        const response = await pool.query(sql, [user_id], (err, data) => {
            if (err) return res.json(err);
      
            return res.json(data);
          });

          console.log("The response in Register car:", response)
          //If user doesnt have existing registered car then set it to current profile by default
          if (response[0].length < 1) {
            const sql = "INSERT IGNORE INTO vehicles (`vin`, mileage, currentVProfile, `user_id`) VALUES (?)"
            const values = [
                req.body.vin,
                parseInt(req.body.mileage),
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
            const sql = "INSERT IGNORE INTO vehicles (`vin`, mileage, currentVProfile, `user_id`) VALUES (?)"
            const values = [
                req.body.vin,
                parseInt(req.body.mileage),
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

module.exports = {addVehicle};