import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../db/models/users';

const ACCESS_TOKEN_SECRET = 'POILKIKIJKK-121333-PPPOPOLFSdf';
const REFRESH_TOKEN_SECRET = 'OOPIENFNFf-99912-FDASPFFSPPPp';

// Generate an access token
export function generateAccessToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Token will expire in 15 minutes
}

// Generate a refresh token
export function generateRefreshToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Token will expire in 7 days
}

// Update the tokens for a user
export async function createAndUpdateTokens(user: User): Promise<{ user: User }> {
  const newAccessToken = generateAccessToken(user.id, user.email);
  const newRefreshToken = generateRefreshToken(user.id, user.email);

  // Update the user's tokens in the database
  user.accessToken = newAccessToken;
  user.refreshToken = newRefreshToken;
  await user.save();

  return { user };
}

export async function updateTokens(
  user: User,
  accessToken: string,
  refreshToken: string,
): Promise<{ user: User }> {
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  await user.save();
  return { user };
}

export function generateTokens(
  userId: string,
  email: string,
): { accessToken: string; refreshToken: string } {
  // Implement the token generation logic here
  // You can use the methods we defined earlier to generate the tokens
  const accessToken = generateAccessToken(userId, email);
  const refreshToken = generateRefreshToken(userId, email);
  return { accessToken, refreshToken };
}

export function verifyAccessToken(
  accessToken: string,
): Promise<{ userId: string; email: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        reject(new Error('Invalid access token'));
      } else {
        // Extract the userId and email from the decoded token
        const { userId, email } = decoded as { userId: string; email: string };
        resolve({ userId, email });
      }
    });
  });
}

// Function to verify the refresh token
export function verifyRefreshToken(
  refreshToken: string,
): Promise<{ userId: string; email: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        reject(new Error('Invalid refresh token'));
      } else {
        // Extract the userId and email from the decoded token
        const { userId, email } = decoded as { userId: string; email: string };
        resolve({ userId, email });
      }
    });
  });
}
