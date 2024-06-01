import mysql from 'mysql2'
import pool from '../mysql/connection.js';

export const passUId = async (req, res) => {
    const Uuid = req.body.parcel;
    const sql = "INSERT IGNORE INTO users(user_id) VALUES (?)";

    try {
        // Execute the INSERT query
        const [data] = await pool.query(sql, [Uuid]);
        return res.json(data);
    } catch (err) {

        return res.status(500).json(err);
    }
};


export default {passUId};