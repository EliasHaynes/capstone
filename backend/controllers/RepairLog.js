const mysql = require("mysql2");
const pool = require("../mysql/connection");

const showUsersRepairById = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const v_id = req.params.v_id;
    console.log("user id:", user_id);
    console.log("v id:", v_id);
    const sql = "SELECT * FROM repairLog WHERE user_id = ? AND v_id = ?";
    const response = await pool.query(sql, [user_id, v_id], (err, data) => {
      if (err) return res.json(err);
      console.log(res.json(data));
      return res.json(data);
    });
    console.log("the response:", response[0]);
    return res.json(response[0]);
  } catch (e) {
    console.error(e);
  }
};

const showRepairById = async (req,res) => {
    try {
        const repair_id = req.params.repair_id;
        const sql = "SELECT * FROM repairLog WHERE repair_id = ?"
        const response = await pool.query(sql, [repair_id], (err, data) => {
            if (err) return res.json(err);
            console.log(res.json(data));
            return res.json(data);
          });
          return res.json(response[0]);
    } catch(e) {
        console.error(e);
    }
}

const createRepair = (req, res) => {
  const user_id = req.params.user_id;
  const v_id = req.params.v_id;
  const sql =
    "INSERT INTO repairLog (`repair_mileage`, `maintenance`, `performed_by`, material, labor, other, user_id,`v_id`) VALUES (?)";

  const values = [
    req.body.mileage,
    req.body.maintenance,
    req.body.performed_by,
    req.body.material,
    req.body.labor,
    req.body.other,
    user_id,
    v_id,
  ];

  console.log("The values:", values);

  pool.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const updateRepair = (req, res) => {
  const sql =
    "UPDATE repairLog SET repair_mileage = ?, maintenance = ?, performed_by = ?, material = ?, labor =?, other =?, v_id = ? WHERE user_id = ? AND repair_id = ?";
  const repair_id = req.params.repair_id;
  const user_id = req.params.user_id;


  const values = [
    req.body.mileage,
    req.body.maintenance,
    req.body.performed_by,
    req.body.material,
    req.body.labor,
    req.body.other,
    req.body.v_id
  ];

  console.log("The Values:", values);
  pool.query(sql, [...values, user_id, repair_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const deleteRepair = async (req, res) => {
    try {
  const sql =
    "DELETE FROM repairLog WHERE repair_id = ?; ALTER TABLE repairLog AUTO_INCREMENT = ?;";
  let repair_id = req.params.repair_id;
  repair_id = parseInt(repair_id, 10);

  const deleteRepair = pool.query(sql, [repair_id, repair_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
  return deleteRepair;
    } catch (e) {
        console.error(e);
    }

};

module.exports = {
  showUsersRepairById,
  showRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
};
