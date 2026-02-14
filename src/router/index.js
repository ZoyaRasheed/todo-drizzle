import express from 'express';
import { healthRoutes } from '../modules/health/index.js';
import { todoRoutes } from '../modules/todo/index.js'

const router = express.Router();

// Register module routes
router.use('/health', healthRoutes);
router.use('/todo',todoRoutes)

export default router;
