import express from 'express';
import { UsersControllers } from './user.controller';

const router = express.Router();

router.post('/users', UsersControllers.crateUsers);
router.get('/users', UsersControllers.getAllUsers);
router.get('/users/:userId', UsersControllers.getSingleUser);
router.delete('/users/:userId', UsersControllers.deletedUserOne)
router.put('/users/:userId', UsersControllers.updateUser)
router.put('/users/:userId/orders', UsersControllers.crateOder)
router.get('/users/:userId/orders', UsersControllers.getusersOrder)
router.get('/users/:userId/orders/total-price', UsersControllers.orderPriceCound)




export const UserRoutes = router;
