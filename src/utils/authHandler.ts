import { Request, Response, NextFunction } from 'express';
import {
  generateAccessToken,
  updateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from './authUtils';
import User from '../db/models/users';

// Middleware to validate access token and handle token refreshing
export const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const refreshToken = req.headers['x-refresh-token'];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  try {
    // Verify the access token
    const { userId, email } = await verifyAccessToken(accessToken);
    (req as any).userId = userId;
    (req as any).email = email;
    next();
  } catch (error: any) {
    // Access token verification failed

    if (!refreshToken) {
      // Refresh token is not provided, or both tokens are expired
      return res
        .status(401)
        .json({ message: 'Access token expired. Please log in again.' });
    }

    try {
      // Verify the refresh token
      const { userId, email } = await verifyRefreshToken(
        refreshToken.toString(),
      );
      (req as any).userId = userId;
      (req as any).email = email;

      // Generate a new access token
      const newAccessToken = generateAccessToken(userId, email);
      // Optionally, update the response with the new access token
      res.set('Authorization', `Bearer ${newAccessToken}`);

      // Update the user with the new tokens
      // const user = /* Retrieve the user from the database using userId */;
      User.findByPk(userId).then(async (user) => {
        if (user) {
          await updateTokens(user, newAccessToken, refreshToken.toString());
        } else {
          return res
            .status(401)
            .json({ message: 'Access token expired. Please log in again.' });
        }
      });

      next();
    } catch (error: any) {
      // Refresh token verification failed
      return res.status(401).json({
        message: 'Refresh token expired or invalid. Please log in again.',
      });
    }
  }
};

// Middleware to validate refresh token
export const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.headers['x-refresh-token'];

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  try {
    const { userId, email } = await verifyRefreshToken(refreshToken.toString());
    (req as any).userId = userId; // Adding 'userId' to the request object
    (req as any).email = email; // Adding 'email' to the request object
    next();
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
