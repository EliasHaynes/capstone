const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')

//Default Route

router.get('/repair', repairLogRoute)
router.post('/create', repairLogRoute)
router.put('/update/:id',repairLogRoute)
router.delete('/delete/:id', repairLogRoute)

    
module.exports = router;
