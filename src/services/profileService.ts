import { UnauthenticatedError } from '../errors';
import User from '../models/User';

export default class ProfileService {
  async getUserProfile(userId: number) {
    const data = await User.findOne({ _id: userId }).select([
      '-_id',
      '-createdAt',
      '-updatedAt',
      '-__v',
    ]);

    return data;
  }

  async changeUserPassword(
    userId: number,
    oldPassword: string,
    password: string,
  ) {
    const user = await User.findOne({ _id: userId }).select(['+password']);
    if (user) {
      const passwordMatch = await user.passwordMatch(oldPassword);
      if (!passwordMatch) {
        // Log: "password mismatch"
        throw new UnauthenticatedError('An error occurred');
      }
    }

    const data = await User.findOneAndUpdate(
      { _id: userId },
      { password },
      { new: true, runValidators: true },
    ).select(['-_id', '-createdAt', '-updatedAt', '-__v']);

    return data;
  }
}
