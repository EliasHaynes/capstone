import express from 'express';
import {getAIResponseOnRepairs} from '../api/aiModal.js';
const router = express.Router()

router.post('/aiModal', getAIResponseOnRepairs);

export default router;