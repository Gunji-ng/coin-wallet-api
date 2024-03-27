import Balance from '../models/Balance';

export default class BalanceService {
  async getUserBalance(userId: number) {
    const data = await Balance.findOne({ userId }).select([
      '-_id',
      '-userId',
      '-createdAt',
      '-updatedAt',
      '-__v',
    ]);

    return data;
  }
}
