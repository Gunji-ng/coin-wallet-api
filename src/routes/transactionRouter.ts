import { Router } from "express";
import { allocateDppCoins, allocateKdjCoins } from "../controllers/transactionController";
import { coinTypes } from "../utils/coinTypes";

const transactionRouter = Router();

transactionRouter.post('/allocate/dpp', allocateDppCoins);
transactionRouter.post('/allocate/kdj', allocateKdjCoins);

export default transactionRouter;