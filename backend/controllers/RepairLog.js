const mysql = require('mysql2')
const pool = require('../mysql/connection')
const {errorOccured} = require('../mysql/error')

const getRepairs = (req,res)  => {
    pool.query("SELECT * FROM repairlog", (err,rows) => {
        if(err) return errorOccured(res,err)
        return res.json(rows)
    })
}

module.exports = {
    getRepairs
}