import Address from '../db/models/addresses';

export async function findAddressByUserId(userId: string) {
  try {
    const address = await Address.findOne({
      where: { userId },
      // include: [User],
    });

    return address;
  } catch (error) {
    console.error('Error finding address:', error);
    throw error;
  }
}

export async function saveAddress(addressData: {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  userId: string;
}): Promise<Address> {
  try {
    // Create the address record in the database
    const address = await Address.create(addressData);

    return address;
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
}
