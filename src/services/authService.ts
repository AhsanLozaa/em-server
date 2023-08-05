import Buyer from '../db/models/buyers';
import Seller from '../db/models/seller';
import User from '../db/models/users';
import bcrypt from 'bcrypt';
import validateRequestBody from '../utils/reqBodyValidator';
import { userSchema } from '../validations/userSchema';
import { CustomError } from '../utils/customError';
import { createAndUpdateTokens, generateTokens } from '../utils/authUtils';

// Service function to create a new buyer
export const registerUser = async (authData: any) => {
  const {
    name,
    email,
    phoneNumber,
    password,
    role,
    sellerRating,
    description,
    businessName,
  } = authData;

  // Check if the email is already in use
  const existingEmailUser = await User.findOne({ where: { email } });

  if (existingEmailUser) {
    throw new CustomError('Email already in use', 400);
  }

  // Check if the phone number is already in use
  const existingPhoneUser = await User.findOne({ where: { phoneNumber } });
  console.log(existingPhoneUser?.email);

  if (existingPhoneUser) {
    throw new CustomError('Phone number already in use', 400);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user record
  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    role,
    password: hashedPassword,
  });

  // Create a seller or buyer record based on the role
  if (role === 'seller') {
    await Seller.create({
      userId: newUser.id,
      sellerRating,
      description,
      businessName,
    });
  } else if (role === 'buyer') {
    await Buyer.create({ userId: newUser.id });
  }

  return { message: 'Signup successful' };
};

export const login = async (authData: any) => {
  const { email, password } = authData;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const updatedUser = await createAndUpdateTokens(user);

    return updatedUser;
  } catch (error) {
    // Handle any errors that occurred during the authentication process
    throw new Error('Authentication failed');
  }
};