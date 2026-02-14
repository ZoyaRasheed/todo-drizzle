import express from 'express';
import { health, exampleFunction } from '../controllers/example.controller.js';

const router = express.Router();

router.get('/health', health);
router.post('/example', exampleFunction);

export default router;
