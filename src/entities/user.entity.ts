import {
  BeforeCreate,
  BeforeValidate,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import UserMeta from './user-meta.entity';
import Social from './social.entity';
@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: 'compositeIndex',
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: 'compositeIndex',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerify: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isLogin: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLoginAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const saltRounds = 10;
    instance.password = await bcrypt.hash(instance.password, saltRounds);
  }

  @BeforeValidate
  static async validatePassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = await bcrypt.hash(instance.password, saltRounds);
    }
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @ForeignKey(() => UserMeta)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userMetaId: number;

  @ForeignKey(() => Social)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  socialId: number;

  // One to One relation with UserMeta
  @HasOne(() => UserMeta)
  userMeta: UserMeta;

  // One to One relation with Social
  @HasOne(() => Social)
  social: Social;
}

export default User;
