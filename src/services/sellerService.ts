// Service function to create a new seller
// export const registerSeller = async (sellerData: Seller): Promise<Seller> => {

import Address from '../db/models/addresses';
import Seller from '../db/models/seller';
import User from '../db/models/users';

// export const registerSeller = async (userData: User, addressData: Address, sellerData: Seller): Promise<Seller> => {
export const registerSeller = async (reqBodyData: any) => {
  try {
    const user: User | null = await User.findByPk(reqBodyData.id);

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

// Add more service functions for updating, deleting, and retrieving sellers
