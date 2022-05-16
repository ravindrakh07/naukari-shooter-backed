import { Schema, model } from 'mongoose';
import { UserInterface } from '../Interfaces/UserInterface'

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = model<UserInterface>('User', userSchema);
export default User;