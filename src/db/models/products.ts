// models/product.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  Default,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Seller from './seller';

@Table({
  timestamps: false,
  tableName: 'products',
})
export default class Product extends Model {
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Seller)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  sellerId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stockQuantity!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isDeleted!: boolean;
}
