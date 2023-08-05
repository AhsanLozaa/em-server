
import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import PaymentMethod from './paymentMethods';
import Buyer from './buyers';


@Table({
    timestamps: false,
    tableName: "buyerPaymentMethods",
  })
export default  class BuyerPaymentMethods extends Model {
    @ForeignKey(() => Buyer)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    buyerId!: string;
  
    @ForeignKey(() => PaymentMethod)
    @Column({
      type: DataType.NUMBER,
      allowNull: false,
    })
  
    paymentMethodId!: number;
  }
  