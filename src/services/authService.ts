import { UnauthenticatedError } from '../errors';
import Balance from '../models/Balance';
import User from '../models/User';

export default class AuthService {
  async registerUser(email: string, name: string, password: string) {
    // TODO: implement user and balance creation as DB transaction
    const user = await User.create({ email, name, password });
    const data = JSON.parse(JSON.stringify(user, null, 2));
    data['token'] = user.generateToken();
    await Balance.create({ userId: data._id });

    delete data['password'];
    delete data['_id'];
    delete data['updatedAt'];
    delete data['__v'];

    return data;
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ email }).select([
      '+password',
      '-createdAt',
      '-updatedAt',
      '-__v',
    ]);
    if (!user) {
      throw new UnauthenticatedError('Email not registered, kindly sign up');
    }

    const passwordMatch = await user.passwordMatch(password);
    if (!passwordMatch) {
      throw new UnauthenticatedError(
        'No account found for that combination of email and password',
      );
    }

    const data = JSON.parse(JSON.stringify(user, null, 2));
    data['token'] = user.generateToken();

    delete data['password'];
    delete data['_id'];

    return data;
  }
}
