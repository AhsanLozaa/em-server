import express from 'express';
import { logger } from '../utils/logger';
import { validateAccessToken } from '../utils/authMiddleware';
import {
  getUserAddress,
  saveUserAddress,
} from '../controllers/addressController';

const router = express.Router();

router.get('/', logger, validateAccessToken, getUserAddress);
router.post('/', logger, validateAccessToken, saveUserAddress);

// router.post('/signup', logger, signUp);
// router.post('/signin', logger, signIn);
// router.post('/test', logger, validateAccessToken, test);
// router.get('/', authenticationMiddleware, (req, res) => userController.getAllUsers(req, res));
// router.get('/:id', authenticationMiddleware, (req, res) => userController.getUserById(req, res));
// router.post('/', (req, res) => userController.createUser(req, res));
// router.put('/:id', authenticationMiddleware, (req, res) => userController.updateUser(req, res));
// router.delete('/:id', authenticationMiddleware, (req, res) => userController.deleteUser(req, res));

export default router;
