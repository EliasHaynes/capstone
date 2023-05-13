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

const updateRepair = (req,res) => {
    const sql = "update users set first_name = ?, last_name = ? where id = ?"
    const id = req.params.id;
    const values = [
        req.body.fName,
        req.body.lName
    ]
    pool.query(sql, [...values, id], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const deleteRepair = (req,res) => {
    const sql = "DELETE FROM users WHERE id = ?"
    const id = req.params.id;
    const values = [
        req.body.fName,
        req.body.lName
    ]
    pool.query(sql, [id], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports = {
    createRepair,
    updateRepair,
    deleteRepair
}