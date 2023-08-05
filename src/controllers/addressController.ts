import { Request, Response } from 'express';
import { findAddressByUserId, saveAddress } from '../services/addressService';

// Controller function to create a new buyer
export async function getUserAddress(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const address = await findAddressByUserId(userId);

    res.status(200).json({
      address,
    });
  } catch (error) {
    console.error('Error finding address:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function saveUserAddress(req: Request, res: Response) {
  try {
    const address = await saveAddress(req.body);
    res.status(200).json({
      address,
    });

    // if (!address) {
    //   res.status(200).json({
    //     address,
    //   });
    // } else {

    // }
  } catch (error) {
    console.error('Error finding address:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
