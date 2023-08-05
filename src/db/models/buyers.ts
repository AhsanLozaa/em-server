import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  DataType,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Address from './addresses';
import Product from './products';
import Order from './orders';
import PaymentMethod from './paymentMethods';
import BuyerPaymentMethods from './buyerPaymentMethods';
import BuyerFavoriteProducts from './buyerFavouriteProducts';

@Table({
  timestamps: false,
  tableName: 'buyers',
})
export default class Buyer extends Model {
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  // Define association to the Product model (assuming a many-to-many relationship)
  @BelongsToMany(() => Product, () => BuyerFavoriteProducts)
  favoriteProducts?: Product[];

  // Define association to the Order model (assuming a one-to-many relationship)
  @HasMany(() => Order)
  orders?: Order[];

  // Define association to the PaymentMethod model (assuming a many-to-many relationship)
  @BelongsToMany(() => PaymentMethod, () => BuyerPaymentMethods)
  paymentMethods?: PaymentMethod[];

  // Define foreign key and association to the Address model (optional: assuming a one-to-one relationship)
  @ForeignKey(() => Address)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  billingAddressId?: string;

  @BelongsTo(() => Address)
  billingAddress?: Address;
}
