import express from 'express';
import { createSeller } from '../controllers/sellerController';
import validateRequestBody from '../utils/reqBodyValidator';
import { parentSchema, userSchema } from '../validations/userSchema';
import { logger } from '../utils/logger';



const router = express.Router();

router.post('/',logger, validateRequestBody(parentSchema),  createSeller);

export default router;
