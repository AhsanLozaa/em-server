import Order, { OrderStatus } from '../db/models/orders';
import ProductOrder from '../db/models/productOrders';
import { CustomError } from '../utils/customError';

// const newOrderData = {
//     totalAmount: 100, // Set the total amount for the order
//     orderDate: new Date(), // Set the order date
//     deliveryAddressId: 'address_id_here', // Set the delivery address ID
//     buyerId: 'buyer_id_here', // Set the buyer ID
//     status: OrderStatus.PENDING, // Set the order status (use the appropriate OrderStatus value)
//     products: [
//       {
//         productId: 'product_id_1', // Set the product ID
//         quantity: 2, // Set the quantity of the product
//       },
//       // Add more products if needed
//     ],
//   };

// Function to create an order
export const createOrder = async (orderData: any) => {
  try {
    // Create the order
    const order = await Order.create(orderData);

    // Create the product order entries
    for (const productItem of orderData.products) {
      await ProductOrder.create({
        productId: productItem.productId,
        orderId: order.id,
        quantity: productItem.quantity,
      });
    }

    // Return the created order
    return order;
  } catch (error) {
    throw error;
  }
};

// const orderIdToCancel = 'order_id_here'; // Provide the ID of the order to cancel
// Function to cancel an order by setting its status to 'CANCELED'
export const abortOrder = async (orderId: string) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new CustomError('Order not found', 404);
    }

    // Set the order status to 'CANCELED'
    // order.status = OrderStatus.CANCELED;
    await order.save();

    // Return the updated order
    return order;
  } catch (error) {
    throw error;
  }
};

// const orderIdToGet = 'order_id_here'; // Provide the ID of the order to retrieve
// Function to get an order by its ID
export const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [ProductOrder], // Include the associated product orders
    });

    if (!order) {
      throw new CustomError('Order not found', 404);
    }

    // Return the order with associated product orders
    return order;
  } catch (error) {
    throw error;
  }
};

export const getAllOrdersByUserId = async (userId: string) => {
  try {
    // Find all orders for the given user ID
    const orders = await Order.findAll({
      where: { buyerId: userId },
      include: [ProductOrder], // Include the associated product orders
    });

    // Return the orders
    return orders;
  } catch (error) {
    throw error;
  }
};

// TODO
// Seller endpoint
// Function to cancel an order by setting its status to 'CANCELED'
export const acceptOrder = async (orderId: string) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new CustomError('Order not found', 404);
    }

    // Set the order status to 'ACCEPTED'
    // order.status = OrderStatus.ACCEPTED;
    await order.save();

    // Return the updated order
    return order;
  } catch (error) {
    throw error;
  }
};
