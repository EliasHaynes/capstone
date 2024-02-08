const mysql = require("mysql2");
const pool = require("../mysql/connection");

const getVehicles = async (req, res) => {
  console.log("1 after async func started")
  const sql = "SELECT * FROM vehicles WHERE user_id = ?";
  const user_id = req.params.user_id;

  console.log("user_id in vehicle profiles controller:", user_id)

  try {
    console.log("2 after try block");

    const response = await pool.query(sql, user_id, (err, data) => {
      if (err) return res.json(err);
      return res.json(data[0]);
    });




    if (response.length > 1) {
      console.log("3a if ran")

    } else {
      console.log("3b else ran")
      const sqlUpdateCurrentVProfileField = "UPDATE vehicles SET currentVProfile = true WHERE user_id = ?"
      pool.query(sqlUpdateCurrentVProfileField, user_id, (err,data) => {
        if (err) return res.json(err);
        return res.json(data)
      });

    }
    return res.json(response[0])
  } catch (e) {
    console.log("4 catch hit")
    console.error(e);
  }
  console.log("5 after try catch block")
};

const getCurrentVehicleProfile = (req, res) => {
  const sql = "SELECT * FROM vehicles WHERE user_id = ? and currentVProfile = true";
  const user_id = req.params.user_id;

  pool.query(sql, [user_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const togglingPrevCurrentAndNewCurrent = async (req,res) => {
    const sql = "UPDATE vehicles SET currentVProfile = false WHERE user_id =? AND currentVProfile = true"

    const user_id = req.params.user_id;

    await pool.query(sql,[user_id], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })

    const toggleNewcurrent = (req,res) => {
        const sql2 = "UPDATE vehicles SET currentVProfile = true WHERE user_id = ? AND v_id = ?"

        const values = [
            req.params.user_id,
            req.params.v_id
        ]
        pool.query(sql2, [values], (err,data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
    }
    toggleNewcurrent()
}

const deleteVehicle = (req,res) => {
    const sql = "DELETE FROM vehicles WHERE v_id =?"

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
