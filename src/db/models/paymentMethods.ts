
// export interface PaymentMethod {
//     cardNumber: string; // Last 4 digits of the card number
//     cardType: string; // Card brand (e.g., "Visa," "Mastercard," etc.)
//     expirationDate: string; // Expiration date of the card (e.g., "MM/YY")
// }
  
// models/payment-method.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: "paymentMethods",
})
export default class PaymentMethod extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cardNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cardType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  expirationDate!: string;
}
