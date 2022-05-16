import { ObjectId, Document } from 'mongoose';

export class UserInterface extends Document{
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}