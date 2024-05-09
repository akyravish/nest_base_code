import {
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './user.entity';

@Table
export class UserMeta extends Model<UserMeta> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  profileImage: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  coverImage: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  bio: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  location: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  website: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  dob: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @HasOne(() => User)
  user: User;
}

export default UserMeta;
