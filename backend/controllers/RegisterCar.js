const mysql = require('mysql2')
const pool = require('../mysql/connection')

const addVehicle = (req,res) => {
    const sql = "INSERT IGNORE INTO vehicles (`vin`, mileage, `user_id`) VALUES (?)"

    const values = [
        req.body.vin,
        parseInt(req.body.mileage),
        req.params.user_id
    ];

    pool.query(sql,[values], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

module.exports = {addVehicle};