import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Buyer from './buyers';
import Product from './products';



@Table({
    timestamps: false,
    tableName: "buyerfavouriteProducts",
  })
 export default class BuyerFavoriteProducts extends Model {
    @ForeignKey(() => Buyer)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    buyerId!: string;
  
    @ForeignKey(() => Product)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    productId!: string;
  }