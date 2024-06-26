import mysql from 'mysql2';
import pool from '../mysql/connection.js'


const getVehicles = async (req, res) => {
  const sql = "SELECT * FROM vehicles WHERE user_id = ?";
  const user_id = req.params.user_id;

  try {
    const response = await pool.query(sql, user_id, (err, data) => {
      if (err) return res.json(err);
      return res.json(data[0]);
    });

    if (response.length > 1) {
      
    } else {
      const sqlUpdateCurrentVProfileField = "UPDATE vehicles SET currentVProfile = true WHERE user_id = ?"
      pool.query(sqlUpdateCurrentVProfileField, user_id, (err,data) => {
        if (err) return res.json(err);
        return res.json(data)
      });
    }
    return res.json(response[0])
  } catch (e) {
    return "Error: " + e

  }
};

const getCurrentVehicleProfile = async (req, res) => {
  const sql = "SELECT * FROM vehicles WHERE user_id = ? AND currentVProfile = 1"; // Use 1 for TRUE in SQL
  const user_id = req.params.user_id;

  const response = await pool.query(sql, [user_id], (err, data) => { // Pass parameters as an array
    if (err) {
      return res.status(500).json({ message: "An error occurred." }); // Send generic error message
    }
    return res.json(data); // Send data
  });
  return res.json(response[0])
};

const getVehicleMileage = async (req,res) => {
  const user_id = req.params.user_id;
  const v_id = req.params.v_id;
  const sql = "SELECT mileage FROM vehicles WHERE user_id = ? AND v_id = ?"
  try {
    const response = await pool.query(sql,[user_id,v_id], (err,data) => {
      if(err) return res.status(500).json("Error:" + e);

      return res.status(200).json(data)
    })
    return res.json(response[0])
  } catch(e) {
    res.status(500).json("Error " + e);
  }
}

const updateVehicleMileage = async (req,res) => {
  const user_id = req.params.user_id;
  const v_id = req.params.v_id;
  const mileage = req.body.mileage
  const sql = "UPDATE vehicles SET mileage = ? WHERE user_id =? AND v_id = ?"
  try {
    const response = await pool.query(sql,[mileage, user_id, v_id], (err,data) => {
      if(err) return res.status(500).json("Error:" + err);
      return res.json(data);
    })
    return res.json(response[0]);

  } catch(e) {
    res.status(500).json("Error" + e)
  }
}


const togglingPrevCurrentAndNewCurrent = async (req, res) => {
  const user_id = req.params.user_id;
  const selectedProfile = req.body.selectedProfile; // Ensure this value is being sent in the request body

  try {
    const sql = "UPDATE vehicles SET currentVProfile = false WHERE user_id = ? AND currentVProfile = true";
    // Update all vehicles to not be the current profile
    await pool.query(sql, [user_id]);

    // Then, update the selected vehicle to be the current profile
    const sql2 = "UPDATE vehicles SET currentVProfile = true WHERE user_id = ? AND v_id = ?";
    const [result] = await pool.query(sql2, [user_id, selectedProfile]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No records updated, possibly invalid user_id or v_id." });
    } else {
      return res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while updating the profile." });
  }
};



  const deleteVehicle = async (req, res) => {
    const sql = "DELETE FROM vehicles WHERE v_id = ?";
    let v_id = req.params.v_id;
    v_id = parseInt(v_id, 10);
    try {
      const delVehicle = await pool.query(sql,[v_id], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
      return res.json(delVehicle);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Deletion failed due to server error.' });
    }
};
 



export default {
    getVehicles,
    getCurrentVehicleProfile,
    getVehicleMileage,
    updateVehicleMileage,
    togglingPrevCurrentAndNewCurrent,
    deleteVehicle
};
