import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.js'

router.post('/passUId', authController.passUId)

export default router;