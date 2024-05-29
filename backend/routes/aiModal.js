import express from 'express';
import aiModalController from '../controllers/aiModal.js';
const router = express.Router()

router.get('/aiModal', aiModalController.getAIResponseOnRepairs);

export default router;