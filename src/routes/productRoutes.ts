import express from 'express';
import { logger } from '../utils/logger';
import { validateAccessToken } from '../utils/authMiddleware';
import {
  getAllProductsByPagination,
  getProductsBySellerId,
  removeProduct,
} from '../controllers/productsController';

const router = express.Router();

router.get('/', logger, validateAccessToken, getProductsBySellerId);
router.delete('/:productId', logger, validateAccessToken, removeProduct);
router.get('/all', logger, validateAccessToken, getAllProductsByPagination);

export default router;
