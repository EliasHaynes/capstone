const mysql = require('mysql2')
const pool = require('../mysql/connection')

const passUId = async (req,res) => {
    const Uuid = req.body.parcel
    const sql = "INSERT IGNORE users(user_id) VALUES (?)"

    pool.query(sql,Uuid, (err,data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
}

module.exports = {passUId}
