import express from 'express';
import authenticationMiddleware from '../utils/authHandler';

const router = express.Router();


router.post('/', )
// router.get('/', authenticationMiddleware, (req, res) => userController.getAllUsers(req, res));
// router.get('/:id', authenticationMiddleware, (req, res) => userController.getUserById(req, res));
// router.post('/', (req, res) => userController.createUser(req, res));
// router.put('/:id', authenticationMiddleware, (req, res) => userController.updateUser(req, res));
// router.delete('/:id', authenticationMiddleware, (req, res) => userController.deleteUser(req, res));

export default router;
