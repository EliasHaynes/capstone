import express from 'express';
import {getAIResponseOnRepairs} from '../controllers/aiModal.js';
const router = express.Router()

router.post('/aiModal', getAIResponseOnRepairs);

export default router;