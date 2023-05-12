const express = require('express')
const repairLogController = require('../controllers/RepairLog')
const router = express.Router()

//GET all repairs
router.get('/repairLog', repairLogController.getRepairs)

module.exports = router;