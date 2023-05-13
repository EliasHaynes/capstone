const express = require('express')
const repairLogController = require('../controllers/RepairLog')
const router = express.Router()

//GET all repairs

router.post('/create', repairLogController.createRepair)

module.exports = router;