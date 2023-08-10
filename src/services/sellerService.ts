// Service function to create a new seller

import Seller from '../db/models/seller';

export const fetchSellers = async (page: number = 1, pageSize: number = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Seller.findAndCountAll({
      offset,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      sellers: rows,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchSellerById = async (sellerId: string) => {
  try {
    const seller = await Seller.findByPk(sellerId);

    if (!seller) {
      throw new Error(`Seller with ID ${sellerId} not found.`);
    }

    return seller;
  } catch (error) {
    throw error;
  }
};
