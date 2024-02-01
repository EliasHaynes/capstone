const mysql = require('mysql2')
const pool = require('../mysql/connection')

const addVehicle = (req,res) => {
    const sql = "INSERT INTO vehicles ('vin', 'mileage', 'user_id') VALUES (?)"

    const user_id = req.params.user_id;

    const values = [
        req.body.vin,
        req.body.mileage
    ];

    pool.query(sql,[values],user_id, (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

module.exports = {addVehicle};