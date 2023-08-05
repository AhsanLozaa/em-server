import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  timestamps: false,
  tableName: "addresses",
})
export default class Address extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  zipCode?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country!: string;
}
