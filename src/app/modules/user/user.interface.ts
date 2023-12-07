/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Order {
  productName?: string;
  price?: number;
  quantity?: number;
}

export interface User extends Document {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: string;
  email: string;
  isActive: boolean;
  hobbies: [string, string, string];
  address: Address;
  order: Order[];
}

export interface  StaticModel extends Model<User> {
  isUserExists(userId: number): Promise<User | null>
} 