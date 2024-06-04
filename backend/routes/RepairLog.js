import express from 'express';
import repairLogController from '../api/RepairLog.js'
const router = express.Router()


//RepairLog Routes
router.get('/repair/:user_id/:v_id', repairLogController.showUsersRepairById)
router.get('/repair/:repair_id', repairLogController.showRepairById)
router.post('/create/:user_id/:v_id', repairLogController.createRepair)
router.put('/update/:user_id/:repair_id', repairLogController.updateRepair)
router.delete('/delete/:repair_id', repairLogController.deleteRepair)

export default router;