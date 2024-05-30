import express from 'express';
import aiModalController from '../controllers/aiModal.js';
const router = express.Router()

router.post('/aiModal', aiModalController.getAIResponseOnRepairs);

export default router;