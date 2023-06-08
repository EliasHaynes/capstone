const express = require('express')
const router = express.Router()
const repairLogRoute = require('./RepairLog')
const { checkJwt } = require('../middleware')
const authRoute = require('./auth')


//Repair Log Routes
router.get('/repair', repairLogRoute)
router.get('/repair/:id', repairLogRoute)
router.post('/create', repairLogRoute)
router.put('/update/:id', repairLogRoute)
router.delete('/delete/:id', repairLogRoute)

//Login Route


    
module.exports = router;
