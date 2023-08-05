import { Request, Response } from 'express';
import { registerBuyer } from '../services/buyerService';

// Controller function to create a new buyer
export const createBuyer = (req: Request, res: Response) => {
  try {
    const buyerData = req.body;
    const newBuyer = registerBuyer(buyerData);
    res.status(201).json(newBuyer);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to create buyer', error: error.message });
  }
};
