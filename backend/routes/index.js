const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')

//Default Route


router.post('/create', repairLogRoute)

    
module.exports = router;
