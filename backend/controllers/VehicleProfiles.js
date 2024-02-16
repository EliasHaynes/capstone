const mysql = require("mysql2");
const pool = require("../mysql/connection");

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
    console.error(e);
  }
};

const getCurrentVehicleProfile = async (req, res) => {
  const sql = "SELECT * FROM vehicles WHERE user_id = ? AND currentVProfile = 1"; // Use 1 for TRUE in SQL
  const user_id = req.params.user_id;

  const response = await pool.query(sql, [user_id], (err, data) => { // Pass parameters as an array
    if (err) {
      console.error(err); // Log the error
      return res.status(500).json({ message: "An error occurred." }); // Send generic error message
    }
    console.log("Query success");
    return res.json(data); // Send data
  });
  return res.json(response[0])
};


const togglingPrevCurrentAndNewCurrent = async (req, res) => {
  const user_id = req.params.user_id;
  const selectedProfile = req.body.selectedProfile; // Ensure this value is being sent in the request body

  const sql = "UPDATE vehicles SET currentVProfile = false WHERE user_id = ? AND currentVProfile = true";

  // Update all vehicles to not be the current profile
  await pool.query(sql, [user_id], async (err, data) => {
      if (err) {
          return res.json(err);
      }
    })

      // Then, update the selected vehicle to be the current profile
      const sql2 = "UPDATE vehicles SET currentVProfile = true WHERE user_id = ? AND v_id = ?";
      pool.query(sql2, [user_id, selectedProfile], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.affectedRows === 0) {
            console.log("No records updated");
        } else {
            console.log("Record updated successfully.");
        }
        return res.json(data);
    });;
  }


const deleteVehicle = (req,res) => {
    const sql = "DELETE FROM vehicles WHERE v_id =?"
    const v_id = req.params.v_id
    console.log("The v_id is...:", v_id)

    pool.query(sql,[v_id], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
}


module.exports = {
    getVehicles,
    getCurrentVehicleProfile,
    togglingPrevCurrentAndNewCurrent,
    deleteVehicle
};
