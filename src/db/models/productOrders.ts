// import { Product } from "./product";


// // ProductOrder interface for individual products in the order
// export interface ProductOrder {
//     product: Product;
//     quantity: number;
// }
  

// models/product-order.model.ts
import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany, DataType } from 'sequelize-typescript';
import Product from './products';
import Order from './orders';

@Table({
  timestamps: false,
  tableName: "productOrders",
})
export default class ProductOrder extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId!: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId!: string;

  @BelongsTo(() => Product)
  product?: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}
