import express from 'express';
import { logger } from '../utils/logger';
import { validateAccessToken } from '../utils/authMiddleware';
import {
  getProductsBySellerId,
  removeProduct,
} from '../controllers/productsController';

const router = express.Router();

router.get('/', logger, validateAccessToken, getProductsBySellerId);
router.delete('/:productId', logger, validateAccessToken, removeProduct);

export default router;
