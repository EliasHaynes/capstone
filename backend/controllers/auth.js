const mysql = require('mysql2')
const pool = require('../mysql/connection')

const passUId = (req,res) => {
    const Uuid = req.body.parcel

    const sql = "INSERT IGNORE INTO users(user_id) VALUES (?) "

    pool.query(sql,[Uuid], (err,data) => {
        console.log("Auth Controller query hit")
        if(err) return res.json(err);
        console.log("Auth Controller Data:", res.json(data))
        return res.json(data)
    })
}

module.exports = {passUId}
