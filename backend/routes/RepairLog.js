const express = require('express')
const repairLogController = require('../controllers/RepairLog')
const router = express.Router()


//RepairLog Routes
router.get('/repair/:user_id/:v_id', repairLogController.showUsersRepairById)
router.get('/repair/:repair_id', repairLogController.showRepairById)
router.post('/create/:user_id/:v_id', repairLogController.createRepair)
router.put('/update/:user_id/:repair_id', repairLogController.updateRepair)
router.delete('/delete/:user_id/:v_id', repairLogController.deleteRepair)

module.exports = router;