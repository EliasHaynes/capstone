const mysql = require('mysql2')
const pool = require('../mysql/connection')

const getVehicles = (req,res) => {
    const sql = "SELECT * FROM vehicles WHERE user_id = ?"

    const user_id = req.params.user_id

    pool.query(sql,[user_id], (err,data) => {
        if (err) return res.json(err);

        return res.json(data)
    })


}

const selectVehicle = () => {

}

const updateVehicle = () => {

}

const deleteVehicle = () => {

}

module.exports = {
    getVehicles,
    selectVehicle,
    updateVehicle,
    deleteVehicle
};
