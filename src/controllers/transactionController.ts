import { Request, Response } from "express";
import { coinTypes } from "../utils/coinTypes";
import TransactionService from "../services/transactionService";


const allocateDppCoins = async (req: Request, res: Response) => {
  new TransactionService().allocateCoins(req, res, coinTypes.DPP_COINS);
};

const allocateKdjCoins = async (req: Request, res: Response) => {
  new TransactionService().allocateCoins(req, res, coinTypes.KDJ_COINS)
};

export {
  allocateDppCoins,
  allocateKdjCoins
};