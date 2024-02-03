const mysql = require('mysql2')
const pool = require('../mysql/connection')

const passUId = (req,res) => {
    console.log("passUuid controller hit")
    const Uuid = req.body.parcel
    console.log("Controller Uuid:", Uuid)
    const sql = "INSERT INTO users(user_id) VALUES (?)"

    pool.query(sql,Uuid, (err,data) => {
        console.log("Auth Controller query hit")
        if(err) return res.json(err);
        console.log("Auth Controller Data:", res.json(data))
        return res.json(data)
    })
}

module.exports = {passUId}
