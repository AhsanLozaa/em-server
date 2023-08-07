import { Op } from 'sequelize';
import Seller from '../db/models/seller';
import User from '../db/models/users';
import Product from '../db/models/products';
import seller from '../db/models/seller';
import { CustomError } from '../utils/customError';
import { sendEmailConfirmation } from '../utils/email/authEmailHandler';

export const createNewProduct = async (reqBodyData: any, userId: string) => {
  try {
    // get the sellerId from the seller
    const seller: Seller | null = await Seller.findOne({
      where: { userId },
    });

    //

    // const user: User | null = await User.findOne({
    //   where: {
    //     email: userData.email,
    //   },
    // });

    // if (!user) {
    //   // If user is not found, create a new user with the sellerData
    //   await User.create({
    //     ...sellerData
    //   });
    // }
    return null;
  } catch (error) {
    // Handle error if necessary
    throw error;
  }

  // return sellerData;
};

export const fetchProductsBySellerId = async (
  sellerId: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Product.findAndCountAll({
      where: { sellerId },
      offset,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      products: rows,
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
    // Handle error if necessary
    throw error;
  }
};

export const deleteProduct = async (productId: string, userId: string) => {
  // ! only the product owner can delete a product

  try {
    // Fetch the product
    const product: Product | null = await Product.findOne({
      where: {
        id: productId,
        isDeleted: false,
      },
    });

    if (product) {
      // fetch the seller by userId
      const seller: Seller | null = await Seller.findByPk(product.sellerId);

      // check if the current user is the seller
      if (seller?.userId === userId) {
        product.isDeleted = true;
        await product.save();
        return { success: true };
      } else {
        throw new CustomError(
          'You are not authorized to delete this product',
          401,
        );
      }
    } else {
      throw new CustomError('Product not found', 404);
    }
  } catch (error) {
    throw error;
  }
};
