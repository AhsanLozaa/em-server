// models/product-order.model.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import Product from './products';
import Order from './orders';

@Table({
  timestamps: false,
  tableName: 'productOrders',
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
