const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')
const { checkJwt } = require('../middleware')



//Repair Log Routes
router.get('/repair', repairLogRoute)
router.get('/repair/:auth0_id', repairLogRoute)
router.get('/repair/:auth0_id/:id',repairLogRoute)
router.post('/create', repairLogRoute)
router.put('/update/:auth0_id/:id', repairLogRoute)
router.delete('/delete/:id', repairLogRoute)

//Login Route


    
module.exports = router;
