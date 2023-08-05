import { Request, Response } from 'express';
import { login, registerUser } from '../services/authService';
import { CustomError } from '../utils/customError';

// Controller function to create a new buyer
export const signUp = async (req: Request, res: Response) => {
  try {
    const reqBodyData = req.body;
    const user = await registerUser(reqBodyData);
    res.status(201).json(user);
  } catch (error: any) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ message: 'Signup failed', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Signup failed', error: 'Internal server error' });
    }
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const reqBodyData = req.body;
    const data = await login(reqBodyData);
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ message: 'Signin failed', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'Signin failed', error: 'Internal server error' });
    }
  }
};

export const test = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: 'Test Successful',
      error: `Testing Successful ✅  (${req.email})  (${req.role})`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Signin failed', error: 'Internal server error' });
  }
};
