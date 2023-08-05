import { Request, Response } from 'express';
import { registerSeller } from '../services/sellerService';
import Seller from '../db/models/seller';
import { fetchProductsBySellerId } from '../services/productService';

export const getProductsBySellerId = async (req: Request, res: Response) => {
  try {
    const { sellerId, page = 1, limit = 10 } = req.body;
    let data = {};

    if (sellerId) {
      // const  sellerData = new Seller(req.body);
      data = await fetchProductsBySellerId(sellerId.toString(), +page, +limit);
    }

    // const newSeller = registerSeller(user, address, seller);
    res.status(201).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Failed to create seller', error: error.message });
  }
};

export const createProduct = (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    // const  sellerData = new Seller(req.body);

    // const newSeller = registerSeller(user, address, seller);
    res.status(201).json({});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Failed to create seller', error: error.message });
  }
};
