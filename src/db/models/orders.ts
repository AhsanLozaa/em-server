// import { Address } from "cluster";
// import { ProductOrder } from "./productOrder";

// export enum OrderStatus {
//   PENDING = "Pending",
//   PROCESSING = "Processing",
//   DELIVERED = "Delivered",
//   CANCELED = "Canceled",
// }


// export interface Order {
//     orderId: string; // Unique identifier for the order
//     products: ProductOrder[]; // Array of products included in the order with their quantity
//     totalAmount: number; // Total amount of the order
//     orderDate: string; // Date when the order was placed
//     deliveryAddress: Address; // Delivery address for the order
//     status: OrderStatus; // Status of the order (e.g., "Pending," "Delivered," etc.)
//   }
  

// models/order.model.ts
import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType, Default} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Address from './addresses';
import ProductOrder from './productOrders';
import Buyer from './buyers';


export enum OrderStatus {
    PENDING = "Pending",
    PROCESSING = "Processing",
    DELIVERED = "Delivered",
    CANCELED = "Canceled",
  }

@Table({
  timestamps: false,
  tableName: "orders",
})
export default class Order extends Model {
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @HasMany(() => ProductOrder)
  products?: ProductOrder[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orderDate!: string;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  deliveryAddressId!: string;

  @BelongsTo(() => Address)
  deliveryAddress?: Address;

  @ForeignKey(() => Buyer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  buyerId!: string;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
  })
  status!: OrderStatus;
}
