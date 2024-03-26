import { Router } from 'express';
import { getBalance } from '../controllers/balanceController';

const authRouter = Router();

export default authRouter.get('/', getBalance);
