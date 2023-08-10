import express from 'express';
import {
  createSeller,
  fetchAllSellersByPagination,
  getchSellerBySellerId,
} from '../controllers/sellerController';
import validateRequestBody from '../utils/reqBodyValidator';
import { parentSchema, userSchema } from '../validations/userSchema';
import { logger } from '../utils/logger';
import { validateAccessToken } from '../utils/authMiddleware';

const router = express.Router();

// router.post('/', logger, validateRequestBody(parentSchema), createSeller);
router.get('/', logger, validateAccessToken, fetchAllSellersByPagination);
router.get('/:sellerId', logger, validateAccessToken, getchSellerBySellerId);

export default router;
