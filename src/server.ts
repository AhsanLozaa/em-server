import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import sellerRoutes from './routes/sellerRoutes';
import buyerRoutes from './routes/buyerRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './utils/errorHandler';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

import databaseConfig from './databaseConfig'; // Import the database configuration
import User from './db/models/users';
import Address from './db/models/addresses';
import Seller from './db/models/seller';
import Buyer from './db/models/buyers';
import Product from './db/models/products';
import BuyerFavoriteProducts from './db/models/buyerFavouriteProducts';
import Order from './db/models/orders';
import BuyerPaymentMethods from './db/models/buyerPaymentMethods';
import PaymentMethod from './db/models/paymentMethods';
import ProductOrder from './db/models/productOrders';

dotenv.config();

console.log(__dirname);

const app = express();
const port = process.env.PORT;

// Use the 'development' configuration from databaseConfig
const sequelize = new Sequelize(databaseConfig.development);
sequelize.addModels([
  User,
  Seller,
  Buyer,
  Address,
  Product,
  BuyerFavoriteProducts,
  Order,
  BuyerPaymentMethods,
  PaymentMethod,
  ProductOrder,
]);
sequelize
  .sync()
  // .sync({ alter: true })
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.log('Err', error);
  });

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users/seller', sellerRoutes);
app.use('/users/buyer', buyerRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
