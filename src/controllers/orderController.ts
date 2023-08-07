import { Request, Response } from 'express';
import { CustomError } from '../utils/customError';
import {
  abortOrder,
  createOrder,
  getAllOrdersByUserId,
  getOrderById,
} from '../services/orderService';

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const data = await createOrder(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ message: 'Failed to create order', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Failed to create order', error: error.message });
    }
  }
};

export const fetchOrder = async (req: Request, res: Response) => {
  try {
    // TODO pass the order id here
    const data = await getOrderById('');
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ message: 'Failed to fetch order', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Failed to fetch order', error: error.message });
    }
  }
};

export const fetchAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const data = await getAllOrdersByUserId(userId);
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ message: 'Failed to fetch all orders', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Failed to fetch al orders', error: error.message });
    }
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    // TODO pass the order id here
    const data = await abortOrder('');
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ message: 'Failed to cancel the order', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Failed to cancel the order', error: error.message });
    }
  }
};
