import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { appRoles } from '../utils/appRoles';

type IUser = {
  name: string;
  email: string;
  password: string;
  roles: appRoles[];
};

type IUserMethods = {
  generateToken(): string;
  passwordMatch(suppliedPassword: string): boolean;
};

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Please provide user's name"],
      minlength: [3, 'name must not be less than 3 characters'],
    },
    email: {
      type: String,
      required: [true, "Please provide user's email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please provide password'],
    },
    roles: {
      type: [Number],
      default: [appRoles.User],
    },
  },
  { timestamps: true },
);

UserSchema.method('generateToken', function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
      name: this.name,
      roles: this.roles,
    },
    process.env.APP_KEY as string,
    { expiresIn: '1h' },
  );
});

UserSchema.method('passwordMatch', async function (suppliedPassword: string) {
  return await bcrypt.compare(suppliedPassword, this.password);
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('findOneAndUpdate', async function () {
  const data = this.getUpdate() as any;
  const salt = await bcrypt.genSalt(10);
  if (data.password) {
    data.password = await bcrypt.hash(data.password, salt);
  }
});

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          default: Test User
 *        email:
 *          type: string
 *          default: user@example.com
 *        password:
 *          type: string
 *          default: secret12#
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            roles:
 *              type: array
 *              items:
 *                type: integer
 *            createdAt:
 *              type: string
 *            token:
 *              type: string
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: user@example.com
 *        password:
 *          type: string
 *          default: secret12#
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            roles:
 *              type: array
 *              items:
 *                type: integer
 *            token:
 *              type: string
 *    GetProfileResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            roles:
 *              type: array
 *              items:
 *                type: integer
 *    ChangeUserPasswordInput:
 *      type: object
 *      required:
 *        - oldPassword
 *        - newPassword
 *      properties:
 *        oldPassword:
 *          type: string
 *          default: secret12#
 *        newPassword:
 *          type: string
 *          default: secret34#
 *    AssignRoleInput:
 *      type: object
 *      required:
 *        - user
 *        - role
 *      properties:
 *        user:
 *          type: string
 *          default: user@example.com
 *        role:
 *          type: string
 *          default: Admin
 */

export default model<IUser, UserModel>('User', UserSchema);
