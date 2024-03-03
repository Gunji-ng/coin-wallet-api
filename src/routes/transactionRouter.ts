import { Router } from "express";
import { allocateDppCoins } from "../controllers/transactionController";

const transactionRouter = Router();

export default transactionRouter.post('/allocate/dpp', allocateDppCoins);