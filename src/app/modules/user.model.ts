import { Address, FullName, Order, StaticModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { User } from './user/user.interface';
import config from '../config';

const fullName = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const address = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const order = new Schema<Order>({
  productName: String,
  price: Number,
  quantity: Number,
});
const userSchmea = new Schema<User, StaticModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  fullName: {
    type: fullName,
    required: true,
  },
  age: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String, String, String], required: true },
  address: { type: address, required: true },
  order: [order],
});

userSchmea.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchmea.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchmea.statics.isUserExists = async function (userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};
export const userModel = model<User, StaticModel>('user', userSchmea);
