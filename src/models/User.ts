import { Model, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { appRoles } from "../utils/appRoles";

interface IUser {
  name: string;
  email: string;
  password: string;
  roles: number[];
};

interface IUserMethods {
  generateToken(): string;
  passwordMatch(suppliedPassword: string): boolean;
};

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Please provide user\'s name'],
      minlength: [3, 'name must not be less than 3 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide user\'s email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password']
    },
    roles: {
      type: [Number],
      default: [appRoles.User]
    }
  },
  { timestamps: true }
);

UserSchema.method('generateToken', function () {
  return jwt.sign({
    userId: this._id,
    email: this.email,
    name: this.name,
    roles: this.roles
  },
    process.env.APP_KEY as string,
    { expiresIn: '1h' });
});

UserSchema.method('passwordMatch', function (suppliedPassword: string) {
  return bcrypt.compare(suppliedPassword, this.password);
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
});

export default model<IUser, UserModel>('User', UserSchema);