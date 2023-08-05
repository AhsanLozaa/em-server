// sellerController.ts
import { Request, Response } from 'express';
import { registerSeller } from '../services/sellerService';
import Seller from '../db/models/seller';

// Controller function to create a new seller
export const createSeller = (req: Request, res: Response) => {
  try {
    // const seller = req.body;
    // const user = req.body;
    // const address = req.body;

    // const  sellerData = new Seller(req.body);

    // const newSeller = registerSeller(user, address, seller);
    res.status(201).json({});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Failed to create seller', error: error.message });
  }
};
