// models/user.model.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
  Unique,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Address from './addresses';

@Table({
  timestamps: true,
  tableName: 'users',
})
export default class User extends Model {
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
  name!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role?: string;

  // Define a foreign key and association to the Address model
  @ForeignKey(() => Address)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  addressId?: string;

  @BelongsTo(() => Address)
  address?: Address;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  accessToken?: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  refreshToken?: string;
}
