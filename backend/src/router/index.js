import express from 'express';
import { todoRoutes } from '../modules/todo/index.js';

const router = express.Router();

// Register module routes
router.use('/todo',todoRoutes);

export default router;
