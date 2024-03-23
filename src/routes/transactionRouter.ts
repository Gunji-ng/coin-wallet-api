import { Router } from "express";
import { allocateDppCoins, allocateKdjCoins } from "../controllers/transactionController";

const transactionRouter = Router();

export default transactionRouter.post('/allocate/dpp', allocateDppCoins).post('/allocate/kdj', allocateKdjCoins);