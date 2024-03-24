import { Request, Response } from "express";
import { coinTypes } from "../utils/coinTypes";
import TransactionService from "../services/transactionService";


// TODO: give access to only DPP Admin
const allocateDppCoins = async (req: Request, res: Response) => {
  new TransactionService().allocateCoins(req, res, coinTypes.DPP_COINS);
};

// TODO: give access to only KDJ Admin
const allocateKdjCoins = async (req: Request, res: Response) => {
  new TransactionService().allocateCoins(req, res, coinTypes.KDJ_COINS)
};

export {
  allocateDppCoins,
  allocateKdjCoins
};