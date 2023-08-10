// sellerController.ts
import { Request, Response } from 'express';
import Seller from '../db/models/seller';
import { fetchSellerById, fetchSellers } from '../services/sellerService';

// Controller function to create a new seller
export const createSeller = (req: Request, res: Response) => {
  try {
    // const seller = req.body;
    // const user = req.body;
    // const address = req.body;

    // const  sellerData = new Seller(req.body);
    res.status(201).json({});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Failed to create seller', error: error.message });
  }
};

export const fetchAllSellersByPagination = async (
  req: Request,
  res: Response,
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await fetchSellers(+page, +limit);

    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Failed to fetch sellers', error: error.message });
  }
};

export const getchSellerBySellerId = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const data = await fetchSellerById(sellerId);

    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Failed to fetch seller', error: error.message });
  }
};
