import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../db/models/users';

const ACCESS_TOKEN_SECRET = 'POILKIKIJKK-121333-PPPOPOLFSdf';
const REFRESH_TOKEN_SECRET = 'OOPIENFNFf-99912-FDASPFFSPPPp';

// Generate an access token
export function generateAccessToken(
  userId: string,
  email: string,
  role: string,
): string {
  return jwt.sign({ userId, email, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  }); // Token will expire in 15 minutes
}

// Generate a refresh token
export function generateRefreshToken(
  userId: string,
  email: string,
  role: string,
): string {
  return jwt.sign({ userId, email, role }, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  }); // Token will expire in 7 days
}

// Update the tokens for a user
export async function createAndUpdateTokens(
  user: User,
): Promise<{ user: User }> {
  if (user.role) {
    const newAccessToken = generateAccessToken(user.id, user.email, user.role);
    const newRefreshToken = generateRefreshToken(
      user.id,
      user.email,
      user.role,
    );
    // Update the user's tokens in the database
    user.accessToken = newAccessToken;
    user.refreshToken = newRefreshToken;
    await user.save();
  }
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
  role: string,
): { accessToken: string; refreshToken: string } {
  // Implement the token generation logic here
  // You can use the methods we defined earlier to generate the tokens
  const accessToken = generateAccessToken(userId, email, role);
  const refreshToken = generateRefreshToken(userId, email, role);
  return { accessToken, refreshToken };
}

export function verifyAccessToken(
  accessToken: string,
): Promise<{ userId: string; email: string; role: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        reject(new Error('Invalid access token'));
      } else {
        // Extract the userId and email from the decoded token
        const { userId, email, role } = decoded as {
          userId: string;
          email: string;
          role: string;
        };
        resolve({ userId, email, role });
      }
    });
  });
}

export const simplyVerifyAccessToken = async (accessToken: string) => {
  return true;
};

export function simp(
  accessToken: string,
): Promise<{ userId: string; email: string; role: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        reject(new Error('Invalid access token'));
      } else {
        // Extract the userId and email from the decoded token
        const { userId, email, role } = decoded as {
          userId: string;
          email: string;
          role: string;
        };

        if (userId && email && role) {
          return true;
        } else {
          return false;
        }
      }
    });
  });
}

// Function to verify the refresh token
export function verifyRefreshToken(
  refreshToken: string,
): Promise<{ userId: string; email: string; role: string }> {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        reject(new Error('Invalid refresh token'));
      } else {
        // Extract the userId and email from the decoded token
        const { userId, email, role } = decoded as {
          userId: string;
          email: string;
          role: string;
        };
        resolve({ userId, email, role });
      }
    });
  });
}

// Function to decode the access token
export function decodeAccessToken(accessToken: string | undefined): {
  userId: string | null;
  email: string | null;
  role: string | null;
} {
  try {
    if (accessToken) {
      const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as {
        userId: string;
        email: string;
        role: string;
      };
      return decoded;
    } else {
      return { userId: null, email: null, role: null };
    }
  } catch (error) {
    console.error('Error decoding access token:', error);
    return { userId: null, email: null, role: null };
  }
}

// Function to decode the refresh token
export function decodeRefreshToken(refreshToken: string | undefined): {
  userId: string | null;
  email: string | null;
  role: string | null;
} {
  try {
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
        userId: string;
        email: string;
        role: string;
      };
      return decoded;
    } else {
      return { userId: null, email: null, role: null };
    }
  } catch (error) {
    console.error('Error decoding refresh token:', error);
    return { userId: null, email: null, role: null };
  }
}
