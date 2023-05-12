const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')

//Default Route

router.get('/repairLog', repairLogRoute)

    
module.exports = router;
