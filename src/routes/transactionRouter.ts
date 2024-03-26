import { Router } from 'express';
import {
  allocateDppCoins,
  allocateKdjCoins,
  transferCoins,
} from '../controllers/transactionController';
import { verifyRolesMiddleware } from '../middleware/verifyRolesMiddleware';
import { appRoles } from '../utils/appRoles';

const transactionRouter = Router();

transactionRouter.post(
  '/allocate/dpp',
  verifyRolesMiddleware(appRoles.DPP_Admin),
  allocateDppCoins,
);
transactionRouter.post(
  '/allocate/kdj',
  verifyRolesMiddleware(appRoles.KDJ_Admin),
  allocateKdjCoins,
);
transactionRouter.post('/transfer', transferCoins);

export default transactionRouter;
