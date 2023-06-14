const express = require('express')
const repairLogController = require('../controllers/RepairLog')
const router = express.Router()


//RepairLog Routes
router.get('/repair', repairLogController.showRepairs)
router.get('/repair/:auth0_id', repairLogController.showRepairById)
router.get('/repair/:auth0_id/:id',repairLogController.showUsersRepairById)
router.post('/create', repairLogController.createRepair)
router.put('/update/:auth0_id/:id', repairLogController.updateRepair)
router.delete('/delete/:id', repairLogController.deleteRepair)

module.exports = router;