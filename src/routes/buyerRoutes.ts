import express from 'express';
import { createBuyer } from '../controllers/buyerController';

const router = express.Router();

router.post('/', createBuyer);

export default router;
