const mysql = require('mysql2')
const pool = require('../mysql/connection')
const {errorOccured} = require('../mysql/error')



const createRepair = (req,res) => {
    const sql = "INSERT INTO users (`first_name`, `last_name`) VALUES (?)"
    const values = [
        req.body.fName,
        req.body.lName
    ]
    pool.query(sql, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports = {
    createRepair
}