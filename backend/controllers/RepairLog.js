const mysql = require('mysql2')
const pool = require('../mysql/connection')

const showRepairs = (req,res) => {
    const sql = "SELECT * FROM repairLog WHERE userid = ?";
    pool.query(sql, (err,data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
}

const showRepairById = (req,res) => {
    const auth0_id = req.params.auth0_id
    
    const sql = "SELECT * FROM repairLog WHERE auth0_id = ?"

    pool.query(sql, auth0_id, (err,data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
}

const showUsersRepairById = (req, res) => {
    const auth0_id = req.params.auth0_id;
    const id = req.params.id;
  
    const sql = "SELECT * FROM repairLog WHERE auth0_id = ? AND id = ?";
  
    pool.query(sql, [auth0_id, id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };


const createRepair = (req,res) => {
    const sql = "INSERT INTO repairLog (`mileage`, `maintenance`, `performedBy`, `contact`, material, labor, other, auth0_id) VALUES (?)"

    const values = [
        req.body.mileage,
        req.body.maintenance,
        req.body.performedBy,
        req.body.contact,
        req.body.material,
        req.body.labor,
        req.body.other,
        req.body.auth0_id
    ]

    pool.query(sql, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const updateRepair = (req,res) => {
    const sql = "UPDATE repairLog SET mileage = ?, maintenance = ?, performedBy = ?, contact = ?, material = ?, labor =?, other =?   WHERE auth0_id = ? AND id =?"
    const id = req.params.id;
    const auth0_id = req.params.auth0_id

    const values = [
        req.body.mileage,
        req.body.maintenance,
        req.body.performedBy,
        req.body.contact,
        req.body.material,
        req.body.labor,
        req.body.other,
    ]
    pool.query(sql, [...values,auth0_id,id], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const deleteRepair = (req,res) => {
    const sql = "DELETE FROM repairLog WHERE id = ?; ALTER TABLE repairLog AUTO_INCREMENT = ?;"
    let id = req.params.id; 
    id = parseInt(id,10);
    const auth0_id = req.body.auth0_id;
    
    pool.query(sql, [id,id], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports = {
    showRepairs,
    showRepairById,
    showUsersRepairById,
    createRepair,
    updateRepair,
    deleteRepair
}