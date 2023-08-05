import express from 'express';
import { logger } from '../utils/logger';
import { signIn, signUp, test } from '../controllers/authController';
import { validateAccessToken } from '../utils/authMiddleware';

const router = express.Router();

router.post('/signup', logger, signUp);
router.post('/signin', logger, signIn);
router.post('/test', logger, validateAccessToken, test);
// router.get('/', authenticationMiddleware, (req, res) => userController.getAllUsers(req, res));
// router.get('/:id', authenticationMiddleware, (req, res) => userController.getUserById(req, res));
// router.post('/', (req, res) => userController.createUser(req, res));
// router.put('/:id', authenticationMiddleware, (req, res) => userController.updateUser(req, res));
// router.delete('/:id', authenticationMiddleware, (req, res) => userController.deleteUser(req, res));

export default router;
