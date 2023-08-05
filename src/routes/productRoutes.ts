import express from 'express';
import { logger } from '../utils/logger';
import { validateAccessToken } from '../utils/authMiddleware';
import { getProductsBySellerId } from '../controllers/productsController';

const router = express.Router();

router.get('/', logger, validateAccessToken, getProductsBySellerId);

export default router;
