import { NotFoundError } from '../errors';
import User from '../models/User';
import { appRoles } from '../utils/appRoles';

export default class RoleService {
  async assignRole(userEmail: string, role: appRoles) {
    const recipient = await User.findOne({ email: userEmail });
    if (!recipient) {
      throw new NotFoundError('recipient not found');
    }

    const data = await User.findOneAndUpdate(
      { _id: recipient.get('_id') },
      { $addToSet: { roles: appRoles[role] } },
      { new: true, runValidators: true },
    ).select(['-_id', '-createdAt', '-updatedAt', '-__v']);
    // TODO: Invalidate existing tokens

    return data;
  }
}
