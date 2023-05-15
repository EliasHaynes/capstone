const express = require('express')
const repairLogController = require('../controllers/RepairLog')
const router = express.Router()


//RepairLog Routes
router.get('/repair', repairLogController.showRepairs)
router.post('/create', repairLogController.createRepair)
router.put('/update/:id', repairLogController.updateRepair)
router.delete('/delete/:id', repairLogController.deleteRepair)

module.exports = router;