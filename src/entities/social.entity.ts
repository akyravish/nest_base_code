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
export class Social extends Model<Social> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  FaceBook: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  Twitter: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  Instagram: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  LinkedIn: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  YouTube: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  GitHub: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
  })
  StackOverflow: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  // One to One relationship with User
  @HasOne(() => User)
  user: User;
}

export default Social;
