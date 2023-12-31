import Buyer from '../db/models/buyers';
import Seller from '../db/models/seller';
import User from '../db/models/users';
import bcrypt from 'bcrypt';
import { createAndUpdateTokens } from '../utils/authUtils';
import { CustomError } from '../utils/customError';
import { sendEmailConfirmation } from '../utils/email/authEmailHandler';
import { generateOTP } from '../utils';

// export const sendSignUPOtp = async (data: any) => {
//   try {
//     const { email } = data;

//     const otp = generateOTP();
//     const otpExpirationMinutes = 10;
//     const expirationTime = new Date(Date.now() + otpExpirationMinutes * 60000);

//     // Save the OTP to the user document in the MongoDB collection
//     const updatedUser = await User.update(
//       {
//         signupOtp: otp,
//         signupOtpExpiration: expirationTime,
//       },
//       {
//         where: {
//           email: email,
//         },
//         returning: true, // This is the equivalent of { new: true } in Mongoose
//       },
//     );

//     await sendEmailConfirmation(email, '123456', 60);
//   } catch (error) {}
// };

// Service function to create a new buyer
export const registerUser = async (authData: any) => {
  try {
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
  } catch (error: any) {
    // throw new Error(error);
    throw new CustomError(error, 500);
  }
};

export const login = async (authData: any) => {
  const { email, password } = authData;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });

    let userRoleData = null;

    if (user) {
      if (user.role === 'buyer') {
        const buyer = await Buyer.findOne({
          where: { userId: user.id },
        });
        if (buyer) {
          userRoleData = buyer.toJSON();
        }
      }

      if (user.role === 'seller') {
        const seller = await Seller.findOne({
          where: { userId: user.id },
        });
        if (seller) {
          userRoleData = seller.toJSON();
        }
      }
    }

    if (!user || !userRoleData) {
      throw new Error('Invalid email or password');
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate new access and refresh tokens
    const updatedUser = await createAndUpdateTokens(user);

    // Return the user information along with buyerData or sellerData
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      accessToken: updatedUser.user.accessToken,
      refreshToken: updatedUser.user.refreshToken,
      role: updatedUser.user.role,
      ...(user.role === 'buyer'
        ? { buyer: userRoleData }
        : { seller: userRoleData }),
    };
  } catch (error) {
    console.log(error);

    // Handle any errors that occurred during the authentication process
    throw new Error('Authentication failed');
  }
};
