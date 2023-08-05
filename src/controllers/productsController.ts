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

// TODO - finish this function
// sample request json
// {
//   "id": "1a27d6c2-53ef-4872-93af-24eab0417f99",
//   "sellerId": "03c262fd-425c-45e5-b3b0-b3aa1f81a775",
//   "name": "Fresh Bread",
//   "description": "Delicious freshly baked bread",
//   "price": 499,
//   "stockQuantity": 100,
//   "image": "https://example.com/bread.jpg",
//   "category": "Bakery"
// }
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
