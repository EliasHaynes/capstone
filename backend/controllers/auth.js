const mysql = require('mysql2')
const pool = require('../mysql/connection')

const passUId = async (req, res) => {
    const Uuid = req.body.parcel;
    const sql = "INSERT IGNORE INTO users(user_id) VALUES (?)";

    try {
        // Execute the INSERT query
        const [data] = await pool.query(sql, [Uuid]);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};


module.exports = {passUId}
