import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, DataType, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Product from './products';
import User from './users';

@Table({
  timestamps: true,
  tableName: "sellers",
})
export default class Seller extends Model {
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sellerRating!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  businessName?: string;

  // Define foreign key and association to the User model
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User)
  user?: User;

  // Define association to the Product model (assuming a one-to-many relationship)
  @HasMany(() => Product)
  products?: Product[];
}
